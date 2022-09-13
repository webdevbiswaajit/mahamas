import Footer from "components/Footer";
import LearnMore from "components/LearnMore";
import Navbar from "components/Navbar";
import Link from "next/link";
import { Accordion } from "react-bootstrap";

const data = [
  {
    question: "How can I apply?",
    answer:
      "You must first register and create an account on <a href='www.mothbahamas.com'><u>www.mothbahamas.com</u></a> Once you have created an account, Click on the Department Of Housing tab and follow the prompts.",
  },
  {
    question: "How long does the entire process take to complete?",
    answer:
      "Application process within 5 business days, once all required documents are received",
  },
  {
    question: "Can I apply jointly with a sibling or another family member?",
    answer:
      "Yes, Joint ownership is permissible once all criteria are met. Should you apply for joint ownership and be approved, you would not be qualified for an additional home.",
  },
  {
    question: "Can a self-employed person apply?",
    answer:
      "Yes. Once you meet the requirements, all gainfully employed person can make an application.",
  },
  {
    question: "Can a Foreigners Apply?",
    answer: "No, Our housing packages are reserved for Bahamians only.",
  },
  {
    question:
      "Can I Build a 2 story home on a lot purchased from Department Of Housing?",
    answer: "No, because the subdivisions are zoned.",
  },
  {
    question: "Are multifamily lots available?",
    answer: "Yes.",
  },
  {
    question: "Are multifamily (Apartments) packages available?",
    answer: "Not through the Department of Housing.",
  },
  {
    question: "What the down payment?",
    answer: "The down payment is 5% or depending on the Institutions",
  },
  {
    question: "Can I use another lending institution other than BMC?",
    answer: "Yes",
  },
  {
    question: "What areas are being considered for housing development?",
    answer:
      'We are building homes throughout the Bahamas. Our first phase is in the New Providence, The Carmichael Village Subdivision. Visit our web page at <a href="www.mothbahamas.com"><u>www.mothbahamas.com</u></a>   to stay updated on new and existing developments.',
  },
  {
    question:
      "How do I keep in contact with my process or if in need of further information?",
    answer:
      "Email <a href='mailto:dohcustomerservice@bahamas.gov.bs'><u>dohcustomerservice@bahamas.gov.bs</u></a> for inquiries or call <a href='tel:2423025800'><u>242-302-5800</u></a>.",
  },
  {
    question: "What is the cost of purchasing a home?",
    answer:
      "The purchase cost varies based on your selection. Once you select a model and an area, our housing officer will sit with you guiding you through the entire process and provide valuable information like the cost of your new house.Remember it’s Affordable Homes.",
  },
  {
    question: "Would I qualify for any tax exemption?",
    answer:
      "Yes, as this is your first home you would qualify for the “First time homeowners’ exemption” benefits and Real Property Tax exemption for an additional five (5) years. Should the value of your property after the five (5) years remain under 250K, you continue to enjoy “Owner Occupies” exemption and pay no Real Property Tax.",
  },
];

export default function Faq() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient text-center py-5">
        <h4>FAQ&apos;s - Frequently Asked Questions</h4>
      </div>
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <Accordion defaultActiveKey="0">
                {data.map((item, i) => (
                  <Accordion.Item className="mb-2" key={i} eventKey={i}>
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
            <div className="d-none d-lg-block col-lg-4">
              <Link href="/contact">
                <a className="btn btn-green w-100 mb-3">Ask A Question</a>
              </Link>
              <LearnMore />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
