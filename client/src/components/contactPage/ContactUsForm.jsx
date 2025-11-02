import { useEffect, useState } from "react"
import { set, useForm } from 'react-hook-form'
import { apiConnector } from "../../services/apiConnector";
import { contactUsEndpoint } from "../../services/apis";
import CountryCode from '../../data/countryCode.json'


const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register, 
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();


    const submitContactForm = async (data) => {
        console.log('logging form data',data )
        try {
            setLoading(true);
            //const response = await apiConnector('POST', contactUsEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log('Contact form submit response:', response);
            setLoading(false);

        } catch (err) {
            console.log('Contact form submit Error:', err.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset ({
                email:'',
                firstname:'',
                lastname:'',
                message:'',
                phoneNo:''
            })
        }
    },[reset, isSubmitSuccessful])


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      
      <div className="flex flex-col gap-5 w-max-content-tab mx-auto">

        <div className="flex gap-5">
            <div className="flex flex-col">
                <label htmlFor="firstname">First Name*</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter first Name"
                    {...register("firstname", {required:true})}
                />
                {
                    errors.firstname && (
                        <span>
                            Please enter your Firstname
                        </span>
                    )
                }
            </div>

            <div className="flex flex-col">
                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Enter last Name"
                    {...register("lastname")}
                />
            </div>
        </div>
      

        <div className="flex flex-col">
            <label htmlFor="email">Email*</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                {...register("email", {required:true})}
            />
            {
                errors.email && (
                    <span>
                        Please enter your Email address
                    </span>
                )
            }
        </div>

        <div className="flex flex-col">
            <label htmlFor="phonenumber">Phone Number</label>
            <div className="flex justify-between w-full">
                {/* Dropdown */}
                <div className="w-[20%]">
                    <select
                        name="dropdown"
                        id="dropdown"
                        className="w-full bg-amber-300 text-black"
                        {...register("countrycode", {required:true})}
                    >
                    {
                        CountryCode.map( (element, index) => {
                            return (
                                <option key={index} value={element.dial_code}>
                                    {element.dial_code} - {element.name}
                                </option>
                            )
                        })
                    }
                    </select>
                </div>

                {/* Nuber Input */}
                <div className="w-[75%]">
                    <input
                        type="number"
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="12345 67890"
                        className="w-full"
                        {...register("phoneNo", 
                            {
                            required:{value:true, message:"Please enter Phone number."},
                            maxLength:{value:10, message:"Invalid Phone number."},
                            minLength:{value:8, message:"Invalid Phone number."}
                            })
                        }
                    />
                </div>
            </div>
            {
                errors.phoneNo && (
                    <span>
                        {errors.phoneNo.message}
                    </span>
                )
            }
        </div>

        <div className="flex flex-col">
            <label htmlFor="message">Enter your message here*</label>
            <textarea
                name="message"
                id="message"
                cols={30}
                rows={7}
                placeholder="Enter your message here"
                className="bg-transparent"
                {...register("message", {required:true})}
            />
            {
                errors.message && (
                    <span>
                        Please enter your message
                    </span>
                )
            }
        </div>

        <div>
            <button 
                type="submit"
                className="rounded-md w-full bg-yellow-50 text-center px-6 text-black font-semibold text-[16px]"
            >
                Send message
            </button>
        </div>

      </div>

    </form>
  )
}

export default ContactUsForm