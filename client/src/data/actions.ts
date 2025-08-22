"use server";
import { z, ZodError } from "zod";
import { EventsSubscribeProps, subscribeService, eventsSubscribeService } from "./services";
import { error } from "console";
import { ZodErrors } from "@/components/ZodErrors";

const subscribeSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
});

export async function subscribeAction(prevState: any, formData: FormData) {
        console.log("Our first server action");
        const email = formData.get("email");

        const validateFields = subscribeSchema.safeParse({
            email: email
        });

        if (!validateFields.success) {
            
            console.dir(validateFields.error.flatten().fieldErrors, { depth: null });

            return {
                ...prevState,
                ZodErrors: validateFields.error.flatten().fieldErrors,
                strapiErrors: null,
            };
        }

        const responseData = await subscribeService(validateFields.data.email);

        if (!responseData) {
            return {
                ...prevState,
                strapiErrors: null,
                zodErrors: null,
                errorMessage: "Oops, something went wrong. Please try again later.",
            }
        }

        if (responseData.error) {
            return {
                ...prevState,
                strapiErrors: responseData.error,
                zodErrors: null,
                errorMessage: "Failed to subscribe.",
            };
        }

        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            errorMessage: null,
            successMessage: "Thank you for subscribing!",
        };
    }

    const eventsSubscribeSchema = z.object({
        firstName: z.string().min(1, {
            message: "Please enter your first name",
        }),
        lastName: z.string().min(1, {
            message: "Please enter your last name",
        }),
        email: z.string().email({
            message: "Please enter a valid email address",
        }),
        telephone: z.string()
            .min(1, { message: "Please enter your phone number" })
            .regex(/^(?:\+230\s?)?5\d{3}\s?\d{4}$/, {
                message: "Please enter a valid phone number",
            }),
    });

    export async function eventsSubscribeAction(prevState: any, formData: FormData) {
        const formDataObject = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            telephone: formData.get("telephone"),
            eventId: formData.get("eventId"),
        }

        const validatedFields = eventsSubscribeSchema.safeParse(formDataObject);

        if (!validatedFields.success) {
            return {
                ...prevState,
                ZodErrors: validatedFields.error.flatten().fieldErrors,
                strapiErrors: null,
                formData: {
                    ...formDataObject,
                },
            };
        }

        const dataToSend: EventsSubscribeProps = {
            ...validatedFields.data,
            event: {
                connect: [formDataObject.eventId as string],
            },
        };

        const responseData = await eventsSubscribeService(dataToSend);

        if (!responseData) {
            return {
                ...prevState,
                strapiErrors: null,
                ZodErrors: null,
                errorMessage: "Oops! Something went wrong. Please try again.",
            };
        }

        if (responseData.error) {
            return {
                ...prevState,
                strapiErrors: responseData.error,
                ZodErrors: null,
                formData: {
                    ...formDataObject,
                },
                errorMessage: "Failed to Subscribe",
            };
        }

        return {
            ...prevState,
            ZodErrors: null,
            strapiErrors: null,
            errorMessage: null,
            formData: null,
            successMessage: "Successfully Subscribed!",
        };
    }