"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FooterLink, InputField } from '@/components/forms'

const SignUpPage = () => {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'US',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology'
    },
    mode: 'onBlur'
  },);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data)
    } catch (e) {
      console.error(e);
      // toast.error('Sign up failed', {
      //     description: e instanceof Error ? e.message : 'Failed to create an account.'
      // })
    }
  }

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Poojan Goyani"
          register={register}
          error={errors.fullName}
          validation={{ required: 'Full name is required', minLength: 2 }}
        />

        <InputField
          name="email"
          label="Email"
          placeholder="poojangoyani@gmail.com"
          register={register}
          error={errors.email}
          validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: 'Password is required', minLength: 8 }}
        />



        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
        </Button>

        <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in" />

      </form>

    </>
  )
}

export default SignUpPage