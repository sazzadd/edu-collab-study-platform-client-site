import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
// import { default as React, default as React } from "react";
import { useForm } from "react-hook-form";
const Review = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
  };

  // Watch rating for dynamic UI updates
  const rating = watch("rating", 0);
  return (
   
  );
};

export default Review;
