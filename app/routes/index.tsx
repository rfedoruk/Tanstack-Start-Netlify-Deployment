import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type bookUseFormType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  organization: string;
  eventType: string;
  numberOfGuests: string;
  eventDate: string;
  address: string;
  eventStartTime: string;
  eventEndTime: string;
  additionalInformation: string;
};

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const methods = useForm<bookUseFormType>();
  const { handleSubmit, reset, control, register } = methods;

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const onSubmit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    try {
      const formSubmit = await fetch("/favicon.ico", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "Book Us", ...data }),
      });
      if (formSubmit.ok) {
        const notifyApiCall = await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (notifyApiCall.ok) {
          reset();
          return;
        } else {
          throw Error("Something went wrong");
        }
      } else {
        throw Error("Error submitting form");
      }
    } catch (error) {
      console.error("error: ", error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      data-netlify="true"
      name="Book Us"
      method="POST"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        gap: 4,
      }}
    >
      <input type="hidden" name="form-name" value="Book Us" />
      <p className="m-auto text-xl md:w-3/4">
        Don&apos;t hesitate any longer, let us help make your next event an
        unforgettable one! Our experienced team is here to ensure your event is
        a success. Fill out our form today and get a free quote. We will contact
        you promptly to provide the quote within 24 hours or sooner. Thank you!
      </p>
      <input
        {...register("fullName", {
          required: { value: true, message: "Please enter name" },
        })}
        placeholder="Full Name"
        className="input-class"
      />
      <input
        {...register("email", {
          required: { value: true, message: "Please enter email" },
        })}
        type="email"
        placeholder="Email"
        className="input-class"
      />
      <input
        {...register("phoneNumber", {
          required: { value: true, message: "Please enter phone number" },
        })}
        type="number"
        placeholder="Phone Number"
        className="input-class"
      />
      <input
        {...register("organization", {
          required: { value: true, message: "Please enter organization" },
        })}
        placeholder="Organization"
        className="input-class"
      />
      <input
        {...register("numberOfGuests", {
          required: { value: true, message: "Please enter number of guests" },
        })}
        placeholder="Number of Guests"
        className="input-class"
      />
      <input
        {...register("eventDate", {
          required: { value: true, message: "Please select a date" },
        })}
        type="date"
        placeholder="Event Date"
        className="input-class"
      />
      <input
        {...register("eventStartTime", {
          required: { value: true, message: "Please select a start time" },
        })}
        type="time"
        placeholder="Event Start Time"
        className="input-class"
      />
      <input
        {...register("eventEndTime", {
          required: { value: true, message: "Please select an end time" },
        })}
        type="time"
        placeholder="Event End Time"
        className="input-class"
      />
      <textarea
        {...register("additionalInformation")}
        placeholder="Additional Information"
        className="textarea-class"
        rows={4}
      ></textarea>
      <button
        type="submit"
        className="middle none center mr-4 rounded-lg bg-blue-500 px-6 py-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Submit
      </button>
    </form>
  );
}
