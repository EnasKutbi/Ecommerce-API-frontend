import UserSidebar from "@/components/UserSidebar"
import useUsersState from "@/hooks/useUsersState"
import { updateUser } from "@/tookit/slices/userSlice"
import { AppDispatch } from "@/tookit/store"
import { UpdateProfileFormData } from "@/types"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

export const UserProfile = () => {
  const { userData } = useUsersState()
  const dispatch: AppDispatch = useDispatch()

      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<UpdateProfileFormData>()

      const [isFromOpen, setIsFromOpen] = useState(false)

      const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
        if (!userData?.userId) {
          toast.error("user data is not available")
          return
        }
        try {
          const response = dispatch(updateUser({ updateUserData: data, userId: userData?.userId }))
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div className="container">
      <UserSidebar />
      <div className="main-container">
        {userData && (
          <>
            <img src={userData.image} alt={userData.name} className="round-img" />
            <h3>Name: {userData.name}</h3>
            <p>Email: {userData.email}</p>
            <p>Address: {userData.address}</p>
            <br />
            <button
              onClick={() => {
                setIsFromOpen(!isFromOpen)
              }}
            >
              {isFromOpen ? "Close Edit Profile" : "Edit Profile"}
            </button>

            {isFromOpen && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-field">
                  <label htmlFor="name"> Name: </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                  />
                  {errors.name && <p> {errors.name.message} </p>}
                </div>

                <div className="form-field">
                  <label htmlFor="address"> Address: </label>
                  <textarea {...register("address")}></textarea>
                </div>

                <button className="btn" type="submit">
                  Update Profile
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
