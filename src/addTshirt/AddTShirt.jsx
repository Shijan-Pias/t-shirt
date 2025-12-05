import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import useAuth from "../hooks/useAuth";

const AddTShirtForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discount: 0,
      stockStatus: "In Stock",
    },
  });
  const axiosSecure = UseAxiosSecure();
  const {user } = useAuth();

  const [imagePreview, setImagePreview] = useState(null);

  // Watch price and discount to auto-calculate discount price
  const price = watch("price");
  const discount = watch("discount");

  useEffect(() => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;
    const calculatedPrice = p - p * (d / 100);
    setValue("discountPrice", calculatedPrice.toFixed(2));
  }, [price, discount, setValue]);

  // Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const sizes = Array.isArray(data.size) ? data.size : [data.size];
    const colors = Array.isArray(data.color) ? data.color : [data.color];

    const finalData = {
      ...data,
      size: sizes,
      color: colors,
       sellerEmail: user?.email ,
      publishedDate: new Date().toISOString(),
    };

    // Show Confirmation Popup First
    const result = await Swal.fire({
      title: "Confirm T-Shirt?",
      html: `
      <p><b>Title:</b> ${finalData.title}</p>
      <p><b>Price:</b> ${finalData.price}৳</p>
      <p><b>Discount:</b> ${finalData.discount}%</p>
      <p><b>Discount Price:</b> ${finalData.discountPrice}৳</p>
      <p><b>Category:</b> ${finalData.category}</p>
      <p><b>Brand:</b> ${finalData.brand}</p>
       <p><b>Colors:</b>  
        ${finalData.color.map((c) => `<span class="badge">${c}</span>`).join("")}
      </p>

      <p><b>Sizes:</b>  
        ${finalData.size.map((s) => `<span class="badge">${s}</span>`).join("")}
      </p>
      <p><b>Quantity:</b> ${finalData.quantity}</p>
      
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    // Stop if canceled
    if (!result.isConfirmed) return;

    // Save your data (You can send to backend here)
    console.log("Saved Data:", finalData);

    axiosSecure.post('/tShirts',finalData)
    .then(res=>{
      console.log(res.data);
      // Success Alert
    Swal.fire({
      title: "Success!",
      text: "T-Shirt added successfully.",
      icon: "success",
      confirmButtonText: "Awesome",
    });



    })


    
    // Reset Form
    reset();
    setImagePreview(null);
  };


  // Constant Arrays for Selects
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = ["Red", "Blue", "Black", "White", "Green", "Yellow"];
  const categories = ["Men", "Women", "Kids", "Unisex", "Sports"];

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6 text-primary">
            Add New T-Shirt
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* --- Section 1: Basic Info & Image --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">T-Shirt Image</span>
                </label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-lg p-6 hover:border-primary transition-colors">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-48 w-full object-contain rounded-md mb-4"
                    />
                  ) : (
                    <div className="text-center text-gray-400 mb-4">
                      No image selected
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    {...register("image", {
                      required: "Image is required",
                      onChange: handleImageChange,
                    })}
                  />
                  {errors.image && (
                    <span className="text-error text-sm mt-1">
                      {errors.image.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Basic Details */}
              <div className="space-y-4">
                {/* Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vintage Rock T-Shirt"
                    className="input input-bordered w-full"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <span className="text-error text-sm">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                {/* Brand & Category Row */}
                <div className="flex gap-4">
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Brand</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nike, Adidas..."
                      className="input input-bordered w-full"
                      {...register("brand", { required: "Brand is required" })}
                    />
                    {errors.brand && (
                      <span className="text-error text-sm">
                        {errors.brand.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Category</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      {...register("category", {
                        required: "Category is required",
                      })}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <span className="text-error text-sm">
                        {errors.category.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* --- Section 2: Pricing & Inventory --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price ($)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="input input-bordered w-full"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be > 0" },
                  })}
                />
                {errors.price && (
                  <span className="text-error text-sm">
                    {errors.price.message}
                  </span>
                )}
              </div>

              {/* Discount % */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Discount (%)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  {...register("discount", {
                    min: 0,
                    max: 100,
                  })}
                />
              </div>

              {/* Discount Price (Read Only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary font-bold">
                    Final Price
                  </span>
                </label>
                <input
                  type="number"
                  readOnly
                  className="input input-bordered input-primary w-full bg-primary/10 font-bold"
                  {...register("discountPrice")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quantity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Total Quantity</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: 1,
                  })}
                />
                {errors.quantity && (
                  <span className="text-error text-sm">
                    {errors.quantity.message}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Stock Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("stockStatus")}
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* --- Section 3: Variants (Size & Color) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-200 p-4 rounded-box">
              {/* Sizes */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Available Sizes</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <label key={size} className="cursor-pointer label justify-start gap-2 border border-gray-300 rounded-lg px-3 py-1 bg-base-100 hover:border-primary">
                      <input
                        type="checkbox"
                        value={size}
                        className="checkbox checkbox-primary checkbox-sm"
                        {...register("size", { required: "Select at least one size" })}
                      />
                      <span className="label-text font-bold">{size}</span>
                    </label>
                  ))}
                </div>
                {errors.size && (
                  <span className="text-error text-sm mt-1">
                    {errors.size.message}
                  </span>
                )}
              </div>

              {/* Colors */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Available Colors</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <label key={color} className="cursor-pointer label justify-start gap-2 border border-gray-300 rounded-lg px-3 py-1 bg-base-100 hover:border-primary">
                      <input
                        type="checkbox"
                        value={color}
                        className="checkbox checkbox-secondary checkbox-sm"
                        {...register("color", { required: "Select at least one color" })}
                      />
                      <span className="label-text">{color}</span>
                    </label>
                  ))}
                </div>
                {errors.color && (
                  <span className="text-error text-sm mt-1">
                    {errors.color.message}
                  </span>
                )}
              </div>
            </div>

            {/* --- Section 4: Description --- */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Detailed description of the T-Shirt..."
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && (
                <span className="text-error text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full text-lg text-white">
                Add T-Shirt
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTShirtForm;