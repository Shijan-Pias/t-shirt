import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { Link } from "react-router";

const ShopTShirts = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  // Fetch T-Shirts
  const { data: tshirts = [], isLoading, error } = useQuery({
    queryKey: ["tshirts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tShirts");
      return res.data.reverse(); // newest first
    },
  });

  // Add to cart
  const handleAddCart = async (shirt) => {
    try {
      if (!user) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to add items to your cart",
        });
        return;
      }

      const cartItem = {
        userEmail: user.email,
        sellerEmail: shirt.sellerEmail || "unknown@seller.com",
        tshirtId: shirt._id,
        title: shirt.title,
        brand: shirt.brand,
        price: shirt.discountPrice || shirt.price,
        quantity: 1,
        status: "pending",
      };

      await axiosSecure.post("/carts", cartItem);

      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${shirt.title} added to cart!`,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not add item to cart",
      });
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading T-shirts...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load T-shirts
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Shop T-Shirts
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tshirts.map((shirt) => (
          <div
            key={shirt._id}
            className="card bg-base-100 shadow-xl border rounded-xl"
          >
            {/* Image */}
            <figure className="p-3">
              <img
                src={shirt.image}
                alt={shirt.title}
                className="rounded-xl h-56 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-lg font-bold">{shirt.title}</h2>

              <p className="text-sm text-gray-600">
                Brand: {shirt.brand}
              </p>

              <p className="text-sm font-semibold">
                Price:{" "}
                {shirt.discountPrice ? (
                  <>
                    <span className="line-through text-gray-500 mr-1">
                      ${shirt.price}
                    </span>
                    <span className="text-green-600">
                      ${shirt.discountPrice}
                    </span>
                  </>
                ) : (
                  <span>${shirt.price}</span>
                )}
              </p>

              {/* Buttons */}
              <div className="card-actions justify-between mt-3">
                <Link to={`/tshirt/${shirt._id}`}>
                  <button className="btn btn-sm btn-primary">
                     Details
                  </button>
                </Link>

                <button
                  onClick={() => handleAddCart(shirt)}
                  className="btn btn-sm btn-success"
                >
                   Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopTShirts;
