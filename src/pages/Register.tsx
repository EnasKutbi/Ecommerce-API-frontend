import PageTitle from "@/components/PageTitle"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AppDispatch } from "@/tookit/store"
import { useDispatch } from "react-redux"
import { registerUser } from "@/tookit/slices/userSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type FormData = {
  name: string
  email: string
  password: string
  address: string
  imgUrl: string
}

export const Register = () => {
    const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await dispatch(registerUser(data))
      toast.success(response.payload.message)
    //   navigate("/login")
    } catch (error: any) {
      toast.error(error.message || "Registration failed")
    }
  }

  return (
    <div className="register">
      <PageTitle title="Register" />
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" }
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^@ ]+@[^@ ]+\.[^@. ]{2,}$/, message: "Email is not valid" }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="address">Address: </label>
          <textarea {...register("address")}></textarea>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
