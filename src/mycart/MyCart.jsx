import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

const MyCart = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get user's cart
  const { data: cartItems = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?userEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // UPDATE QUANTITY
  const updateQuantity = useMutation({
    mutationFn: ({ id, quantity }) =>
      axiosSecure.patch(`/carts/${id}`, { quantity }),
    onSuccess: () => queryClient.invalidateQueries(["carts", user.email]),
  });

  // DELETE ONE ITEM
  const removeItem = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/carts/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["carts", user.email]),
  });

  // CLEAR FULL CART
  const clearCart = useMutation({
    mutationFn: () => axiosSecure.delete(`/carts/user/${user.email}`),
    onSuccess: () => queryClient.invalidateQueries(["carts", user.email]),
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Remove</th>
                <th>Checkout</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                

                  <td>{item.title}</td>
                  <td>{item.brand}</td>

                  <td>{item.price}৳</td>

                  {/* QUANTITY */}
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      className="input input-bordered w-20"
                      onChange={(e) =>
                        updateQuantity.mutate({
                          id: item._id,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </td>

                  <td>{(item.price * item.quantity).toFixed(2)}৳</td>

                  {/* REMOVE BUTTON */}
                  <td>
                    <button
                      onClick={() => removeItem.mutate(item._id)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  </td>

                  {/* CHECKOUT / PAID BUTTON */}
                  <td>
                    {item.status === "pending" ? (
                      <Link to={`/dashboard/payment/${item._id}`}>
                        <button className="btn btn-primary btn-sm">
                          Pay
                        </button>
                      </Link>
                    ) : (
                      <button className="btn btn-success btn-sm cursor-default">
                        Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CLEAR CART BUTTON */}
          <div className="mt-4">
            <button
              className="btn btn-warning"
              onClick={() =>
                Swal.fire({
                  title: "Clear Cart?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, clear all!",
                }).then((result) => {
                  if (result.isConfirmed) clearCart.mutate();
                })
              }
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;
