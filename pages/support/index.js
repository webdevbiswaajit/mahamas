import { Icon } from "@iconify/react";
import axios from "apis/axios";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import withAuth from "HOC/withAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

function ContactSupport() {
  const [attName, setAttName] = useState("Add Attachment (optional)");
  const [profileData, setProfileData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.attachment.length > 0) {
      formData.append("attachment", data.attachment[0]);
    } else {
      formData.delete("attachment");
    }
    try {
      setSubmitting(true);
      const res = await axios.post("/support_conversations", formData);
      toast.success("Application submitted successfully");
      setSubmitting(false);

      router.push(`/support/${res.data.id}`);
    } catch (err) {
      setSubmitting(false);
      toast.error("Something went wrong!");
    }
  };

  const handleAttachmentChange = ({ target }) => {
    if (target.files.length) {
      setAttName(target.files[0].name);
    } else {
      setAttName("Add Attachment (optional)");
    }
  };

  useEffect(() => {
    axios.get("/profile").then((res) => setProfileData(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <h3 className="bg-gradient py-4 text-light text-center mb-0">
            How may we help you?
          </h3>
        </div>
        <div className="container">
          <h5 className="py-4">Contact Customer Care</h5>
          <div className="card rounded-3 shadow">
            <div className="card-body">
              <h6>Please fill in teh form and describe your issue/problem:</h6>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                <div className="row">
                  <div className="col-6">
                    {profileData ? (
                      <select
                        {...register("language", { required: true })}
                        className="form-control bg-light border-0"
                      >
                        <option value="">Select a language</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                      </select>
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    {profileData ? (
                      <input
                        {...register("fname", { required: true })}
                        className="form-control bg-light border-0"
                        type="text"
                        placeholder="First Name"
                        defaultValue={profileData.fname}
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                  <div className="col-6">
                    {profileData ? (
                      <input
                        {...register("lname", { required: true })}
                        className="form-control bg-light border-0"
                        type="text"
                        placeholder="Last Name"
                        defaultValue={profileData.lname}
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    {profileData ? (
                      <input
                        {...register("email", { required: true })}
                        className="form-control bg-light border-0"
                        type="email"
                        placeholder="Email"
                        defaultValue={profileData.email}
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                  <div className="col-6">
                    {profileData ? (
                      <input
                        {...register("subject", { required: true })}
                        className="form-control bg-light border-0"
                        type="text"
                        placeholder="Subject"
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <textarea
                      {...register("description", { required: true })}
                      className="form-control bg-light border-0"
                      placeholder="Describe your issue/problem(1000 words)"
                      rows={5}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <input
                      {...register("attachment", {
                        onChange: handleAttachmentChange,
                      })}
                      type="file"
                      className="d-none"
                    />
                    <div
                      onClick={() => {
                        document
                          .querySelector("input[name=attachment]")
                          .click();
                      }}
                      className="bg-light py-2 px-3 d-block cursor-pointer"
                    >
                      {attName}
                      <span className="float-end">
                        <Icon className="fs-4" icon="mdi:attachment-plus" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <input
                    disabled={submitting}
                    className="btn btn-green"
                    type="submit"
                    value={submitting ? "Submitting" : "Submit"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(ContactSupport);
