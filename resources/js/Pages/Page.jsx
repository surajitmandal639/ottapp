import Banner from '@/Components/Banner';
import Breadcrumb from '@/Components/Breadcrumb';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Index({ page }) {
  
  const { data, setData, post } = useForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission (adjust URL and data as needed)
    post('/contact', {
      onSuccess: () => {
        // Add success handling here
      },
      onError: () => {
        // Add error handling here
      },
    });
  };

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  return (
    <>
      <Authenticated>
        <Head title={page?.title} />
        <Breadcrumb />
        <Banner />
        
        <div className="contact-page-area vfx-item-ptb vfx-item-info">
          <div className="container-fluid">
            <div className="row">

            {page && page?.slug === 'contact-us' && (
              <div className="col-lg-8 col-md-7 col-sm-12 col-xs-12">
                <div className="contact-form">
                  <form
                    onSubmit={handleSubmit}  // Attach the form submit handler
                    className="row"
                    id="contact_form"
                    role="form"
                  >
                    {/* Name Field */}
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group mb-3">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={handleChange}  // Update form state on input change
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group mb-3">
                        <label>Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group mb-3">
                        <label>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={data.subject}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Subject"
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group mb-3">
                        <label>Your Message</label>
                        <textarea
                          name="message"
                          value={data.message}
                          onChange={handleChange}
                          className="form-control"
                          cols="30"
                          rows="4"
                          placeholder="Your Message..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group">
                        <button
                          type="submit"
                          className="vfx-item-btn-danger text-uppercase"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div
              className={`${page && page?.slug === 'contact-us' ? 'col-lg-4 col-md-5 col-sm-12 col-xs-12' : 'container-fluid'}`}
            >
              <div className="contact-form">
              <div dangerouslySetInnerHTML={{ __html: page.description }} />
                
              </div>
            </div>


            </div>
          </div>
        </div>

        <Banner />


      </Authenticated>
    </>
  );
}
