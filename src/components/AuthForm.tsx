import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useContext, useState } from "react"
import { AuthContext } from "@/provider/AuthContext"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Invalid username" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
  bio: z.string().max(160, { message: "Bio must be max 160 characters" }).optional(),
  birthday: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  avatar: z.instanceof(File, { message: "Avatar must be an image file" }).optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

export function LoginForm() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login } = auth;  
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values.email,values.username, values.password)
      navigate("/") 
    } catch (err) {
      if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unknown error occurred");
    }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && <p className="text-red-500">{error}</p>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <Link to={"/forget-password"} className="text-blue-500">Forget password?</Link>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </Form>
  )
}

export function RegisterForm() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { register } = auth;
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      bio: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    try {
      let formattedBirthday = "";
      if (values.birthday) {
        const birthdayDate = new Date(values.birthday);
        if (!isNaN(birthdayDate.getTime())) {
          formattedBirthday = birthdayDate.toISOString(); // Convertir en ISO-8601
        } else {
          throw new Error("Invalid birthday format");
        }
      }
      values.birthday = formattedBirthday;
      await register(values)
      navigate("/auth.login")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }else {
        setError("An unknown error occurred");
      }
    }
  }

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <h2 className="text-xl font-semibold">
          {step === 1 ? "Step 1: General Information" : "Step 2: Security & Account"}
        </h2>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {error && <p className="text-red-500">{error}</p>}

            {step === 1 && (
              <>
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+33 6 12 34 56 78" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="bio" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about yourself..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="birthday" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}

            {step === 2 && (
              <>
                <FormField control={form.control} name="username" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {step > 1 && <Button onClick={() => setStep(step - 1)}>Back</Button>}
            {step < 2 ? (
              <Button onClick={() => setStep(step + 1)}>Next</Button>
            ) : (
              <Button type="submit">Register</Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
