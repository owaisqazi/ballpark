import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import BaseUrl from "../../Auth/BaseUrl";
import { Link } from "react-router-dom";

const Profile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [Data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: useMemo(
      () => ({
        name: Data?.fname || "",
        company: Data?.company || "",
        age: Data?.age || "",
        email: Data?.email || "",
        image: Data?.profile || null,
      }),
      [Data]
    ),
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      company: Yup.string()
        .min(2, "Company must be at least 2 characters")
        .required("Company is required"),
      age: Yup.string()
        .min(2, "Age must be 18 or older")
        .required("Age is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      image: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        if(Data.id){
          formData.append("name", values?.name);
        }
        formData.append("id",Data.id);
        formData.append("age", values?.age);
        formData.append("email", values?.email);
        formData.append("company", values?.company);
        formData.append("profile", values?.image);
        const response = await axios.put(
          `${BaseUrl?.baseurlImage}profile/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Form submitted successfully:", response.data);
        getProfile();
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error submitting the form:", error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: error.response?.data?.message || "Error",
          text: "Something went wrong!",
        });
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e?.target?.files[0];
    formik.setFieldValue("image", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const getProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${BaseUrl.baseurlImage}profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data?.data);
    } catch (error) {
      console.error("Error retrieving the profile data:", error);
      Swal.fire({
        icon: "error",
        title: "Error retrieving profile data",
      });
    }
  }, [token]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="container profile-page p-4">
              <Link
                type="button"
                className="btn btn-white d-flex align-items-center pt-2"
                to={"/"}
              >
                <i className="fa fa-angle-left" style={{ fontSize: "25px" }}></i>
                &nbsp; <span>Back</span>
              </Link>
      <h3 className="text-primary fw-bold  text-center">
        User Profile
      </h3>
      <div className="d-md-flex d-block justify-content-center align-items-center h-100" id="maindive">
        {/* Image Section */}
        <div className="col-md-3">
          <div
            className="img-wrap custom-file-upload my-2 shadow"
            onClick={handleImageClick}
            style={{
              width: "180px",
              height: "183px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              border: "4px solid #8E1858",
            }}
          >
            <img
              src={
                imagePreview ||
                Data.profile ||
                "https://example.com/default-profile.png"
              }
              alt="User profile"
              className="img-fluid rounded-circle w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          <input
            accept="image/*"
            className="d-none"
            ref={fileInputRef}
            type="file"
            onChange={handleImageChange}
          />
        </div>
        {/* Form Section */}
        <form onSubmit={formik.handleSubmit} className="col-md-8 p-2">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label
                htmlFor="name"
                className="form-label fw-bold text-secondary"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control text-start shadow-sm border-0"
                style={{ borderRadius: "15px", backgroundColor: "#f8f9fa" }}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger small mt-1">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                htmlFor="company"
                className="form-label fw-bold text-secondary"
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control text-start shadow-sm border-0"
                style={{ borderRadius: "15px", backgroundColor: "#f8f9fa" }}
              />
              {formik.touched.company && formik.errors.company && (
                <div className="text-danger small mt-1">
                  {formik.errors.company}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                htmlFor="age"
                className="form-label fw-bold text-secondary"
              >
                Age
              </label>
              <input
                type="text"
                name="age"
                placeholder="Age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control text-start shadow-sm border-0"
                style={{ borderRadius: "15px", backgroundColor: "#f8f9fa" }}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger small mt-1">
                  {formik.errors.age}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                htmlFor="email"
                className="form-label fw-bold text-secondary"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-control text-start shadow-sm border-0"
                style={{ borderRadius: "15px", backgroundColor: "#f8f9fa" }}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger small mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
          </div>
          <div className="text-start mt-4">
            <button
              type="submit"
              className={`btn btn-primary text-uppercase w-100 fw-bold px-5 py-2 ${loading ? "disabled" : ""}`}
              style={{
                borderRadius: "30px",
                fontSize: "16px",
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
