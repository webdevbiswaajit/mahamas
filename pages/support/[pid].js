import { Icon } from "@iconify/react";
import axios from "apis/axios";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import Image from "next/image";

function Conversation() {
  const [messages, setMessages] = useState(null);
  const [conversationInfo, setConversationInfo] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, reset, setError } = useForm();
  const { pid } = router.query;

  const onSubmit = async (data) => {
    if (!data.message && !data.attachment[0]) {
      setError(
        "message",
        { type: "custom", message: "Message body cannot be empty!" },
        { shouldFocus: true }
      );
      return;
    }

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
      const res = await axios.post(
        `support_conversations/${pid}/send-message`,
        formData
      );
      setSubmitting(false);
      setMessages([...messages, res.data]);
      setConversationInfo({ ...conversationInfo, status: "active" });
      reset();
    } catch (err) {
      setSubmitting(false);
      toast.error("Something went wrong!");
    }
  };

  const handleSolved = async () => {
    try {
      const res = await axios.get(`support_conversations/${pid}/resolve`);
      setConversationInfo({ ...conversationInfo, status: "solved" });
    } catch (err) {}
  };

  const handleRefresh = () => {
    axios.get(`/support_conversations/${pid}`).then((res) => {
      setMessages(res.data.support_messages);
      delete res.data.support_messages;
      setConversationInfo(res.data);
    });
  };

  useEffect(() => {
    if (pid) {
      axios.get(`/support_conversations/${pid}`).then((res) => {
        setMessages(res.data.support_messages);
        delete res.data.support_messages;
        setConversationInfo(res.data);
      });
    }
  }, [pid]);

  return (
    <>
      <Navbar />
      {showLightbox && (
        <Lightbox
          onClose={() => setShowLightbox(false)}
          image={lightboxImage}
        />
      )}
      <div className="container-fluid">
        <div className="row">
          <h3 className="bg-gradient py-4 text-light text-center mb-0">
            Conversation
          </h3>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-lg-8 order-2 order-lg-1 mt-3 mt-lg-0">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-end">
                    <button
                      disabled={conversationInfo?.status == "solved"}
                      onClick={handleSolved}
                      className="btn btn-sm btn-green"
                    >
                      Mark as solved
                    </button>
                  </div>
                  {messages &&
                    messages.map((item) => (
                      <div key={item.id} className="row">
                        <div className="d-flex align-items-center mb-3">
                          <div className="convo-user-img-container">
                            <Image
                              height={300}
                              width={500}
                              alt=""
                              src={
                                item.senderable?.media?.length
                                  ? item.senderable.media[0].original_url
                                  : "/img/no-photo.png"
                              }
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0">
                              {item.senderable.name ??
                                item.senderable.fname +
                                  " " +
                                  item.senderable.lname}
                            </h6>
                            <small className="text-muted">
                              {new Date(item.created_at).toLocaleDateString()}
                              <span className="mx-2" />
                              {new Date(item.created_at).toLocaleTimeString()}
                            </small>
                          </div>
                        </div>
                        {item.message && (
                          <small className="mb-3">{item.message}</small>
                        )}
                        {item.attachments.length
                          ? item.attachments.map((attachment, index) => {
                              if (
                                attachment.original.split(".").pop() == "pdf"
                              ) {
                                return (
                                  <Link href={attachment.original}>
                                    <a className="d-inline">
                                      <u>
                                        {attachment.original.split("/").pop()}
                                      </u>
                                    </a>
                                  </Link>
                                );
                              } else {
                                return (
                                  <Image
                                    height={300}
                                    width={300}
                                    alt=""
                                    onClick={() => {
                                      setShowLightbox(true);
                                      setLightboxImage(attachment.original);
                                    }}
                                    className="convo-attachment mb-3 cursor-pointer"
                                    key={index}
                                    src={attachment.thumb}
                                  />
                                );
                              }
                            })
                          : ""}
                        <hr />
                      </div>
                    ))}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                      className="form-control mt-3"
                      rows="5"
                      placeholder="Your Message here"
                      {...register("message")}
                    />
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <div>
                        <input
                          className="d-none"
                          type="file"
                          {...register("attachment")}
                        />
                        <Icon
                          className="cursor-pointer"
                          icon="jam:attachment"
                          onClick={() =>
                            document
                              .querySelector("input[name=attachment]")
                              .click()
                          }
                        />
                        <span className="mx-1"></span>
                        <Icon className="cursor-pointer" icon="bi:trash" />
                      </div>
                      <div>
                        <Icon
                          className="cursor-pointer me-3 fs-4 color-green"
                          onClick={handleRefresh}
                          icon="ci:refresh"
                        />
                        <input
                          disabled={submitting}
                          type="submit"
                          value="Send message"
                          className="btn btn-sm btn-blue"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 order-1 order-lg-2">
              <div className="card">
                <div className="card-body">
                  <table>
                    <tbody>
                      <tr>
                        <td>ID</td>
                        <td className="px-3">:</td>
                        <td>{conversationInfo?.id || <Skeleton />}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td className="px-3">:</td>
                        <td>
                          {conversationInfo ? (
                            <small
                              className={`px-3 ${
                                conversationInfo.status == "waiting"
                                  ? "bg-blue"
                                  : conversationInfo.status == "active"
                                  ? "bg-green"
                                  : "bg-purple"
                              } rounded-3`}
                            >
                              {conversationInfo.status}
                            </small>
                          ) : (
                            <Skeleton />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Created</td>
                        <td className="px-3">:</td>
                        <td>
                          {conversationInfo ? (
                            `${new Date(
                              conversationInfo.created_at
                            ).toLocaleDateString()}, ${new Date(
                              conversationInfo.created_at
                            ).toLocaleTimeString()}`
                          ) : (
                            <Skeleton />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>From</td>
                        <td className="px-3">:</td>
                        <td>
                          {conversationInfo ? (
                            conversationInfo.fname +
                            " " +
                            conversationInfo.lname
                          ) : (
                            <Skeleton />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>To</td>
                        <td className="px-3">:</td>
                        <td>
                          {conversationInfo ? (
                            conversationInfo.last_admin
                          ) : (
                            <Skeleton />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(Conversation);
