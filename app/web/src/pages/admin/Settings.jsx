import React from 'react'

const Settings = () => {
    return (
        <div>
            <form>
                <div className="row ">

                    <div className="col-sm-6 form-group">
                        <label htmlFor="name-f">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fname"
                            id="name-f"
                            placeholder="Enter your first name."
                            required=""
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="name-l">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lname"
                            id="name-l"
                            placeholder="Enter your last name."
                            required=""
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Enter your email."
                            required=""
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="address-1">Address Line-1</label>
                        <input
                            type="address"
                            className="form-control"
                            name="Locality"
                            id="address-1"
                            placeholder="Locality/House/Street no."
                            required=""
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="address-2">Address Line-2</label>
                        <input
                            type="address"
                            className="form-control"
                            name="address"
                            id="address-2"
                            placeholder="Village/City Name."
                            required=""
                        />
                    </div>
                    <div className="col-sm-4 form-group">
                        <label htmlFor="State">State</label>
                        <input
                            type="address"
                            className="form-control"
                            name="State"
                            id="State"
                            placeholder="Enter your state name."
                            required=""
                        />
                    </div>
                    <div className="col-sm-2 form-group">
                        <label htmlFor="zip">Postal-Code</label>
                        <input
                            type="zip"
                            className="form-control"
                            name="Zip"
                            id="zip"
                            placeholder="Postal-Code."
                            required=""
                        />
                    </div>

                    <div className="col-sm-6 form-group">
                        <label htmlFor="Date">Date Of Birth</label>
                        <input
                            type="Date"
                            name="dob"
                            className="form-control"
                            id="Date"
                            placeholder=""
                            required=""
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="sex">Gender</label>
                        <select id="sex" className="form-control browser-default custom-select">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unspesified">Unspecified</option>
                        </select>
                    </div>
                    <div className="col-sm-2 form-group">
                        <label htmlFor="cod">Country code</label>

                    </div>


                    <div className="col-sm-12">
                        <input
                            type="checkbox"
                            className="form-check d-inline"
                            id="chb"
                            required=""
                        />
                        <label htmlFor="chb" className="form-check-label">
                            &nbsp;I accept all terms and conditions.
                        </label>
                    </div>
                    <div className="col-sm-12 form-group mb-0">
                        <button className="btn btn-primary float-right">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Settings
