import ContactUsForm from "../components/contactPage/ContactUsForm"

const ContactUs = () => {
  return (
    <div className="flex text-richblack-5 mx-auto">
      <div className="fle flex-col">

        <div className="flex flex-col">
            <div className="flex gap-2">
                <p>icon</p>
                <p>
                    Chat us
                </p>
            </div>
            <div>
                Our friendly team is here to help.
                info@studyproject.com
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex gap-2">
                <p>icon</p>
                <p>
                    Visit us
                </p>
            </div>
            <div>
                Come and say hellow at our office HQ.
                Vikas Nagar, Ist Block cross, Vidhan Nagar,
                Baglore-560013
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex gap-2">
                <p>icon</p>
                <p>
                    Call us
                </p>
            </div>
            <div>
                Mon-Fri from 8am to 5pm
                +12345 67890
            </div>
        </div>
        
      </div>

      <div className="flex flex-col border border-richblack-800">
        <h2>
            Got an Idea? We have got the skills. Let's team up
        </h2>
        <p>
            Tell us more about yourself and what you're got in mind.
        </p>
        <div>
            <ContactUsForm/>
        </div>
      </div>

    </div>
  )
}

export default ContactUs