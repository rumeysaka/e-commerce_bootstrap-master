import React, { useState,useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useForm, FormProvider } from 'react-hook-form'
import { commerce } from '../../lib/commerce'
import { useEffect } from 'react'
import { OrderContext } from '../../OrderContext'

export default function InitialForm({ token, increment, test }) {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const [newData, setNewData] = useState([])
  const methods = useForm()

  const { Adform, handleSubmit, errors } = useForm()

  const { order, setOrder } = useContext(OrderContext)

  const handleSub = (e) => {
    e.preventDefault()
    // hadi()
    setNewData(
      [{
       line_items: token.live.line_items,
        name: name,
        surname: surname,
        zipcode: zipcode,
        address: address,
        email: email,
        shippingCountry: shippingCountry,
        shippingSubdivision: shippingSubdivision,
        shippingOption: shippingOption,
    }])
  
    console.log("newData", newData)
    // setOrder(newData)
    setOrder([...order].concat(newData))
    console.log("order", order)
    
// Object.keys(order).forEach(key => {
//   // console.log(key); // 👉️ name, age
//   console.log(order[key]); // 👉️ 'Tom', 30
// });
  }
  function hadi() {
    setOrder([...order].concat([newData]))
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
      country,
      region: stateProvince,
    })

    setShippingOptions(options)
    setShippingOption(options[0].id)
  }
  useEffect(() => {
    fetchShippingCountries(token.id)
  }, [])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(token.id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])

  return (
    <div>
      <FormProvider>
        <Form
          //  onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}
          onSubmit={handleSub}
          className='d-flex row'>
          <Form.Group className='col-6' controlId='formBasicEmail'>
            <div>Name</div>
            <Form.Control
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)}
              style={{ height: '28px' }}
              className='mb-3'
              type='Name'
            />
            <div>Address</div>
            <Form.Control
              value={address}
              name='address'
              onChange={(e) => setAddress(e.target.value)}
              style={{ height: '28px' }}
              className='mb-3'
              type='Address'
            />
            <div>Zip Code</div>
            <Form.Control
              value={zipcode}
              name={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              style={{ height: '28px' }}
              className='mb-3'
              type='Zip Code'
            />
            <div>Shipment</div>
            <Form.Select
              style={{ height: '28px', padding: '3px', paddingTop: '0px' }}
              className='mb-3'
              fullWidth
              onChange={(e) => setShippingOption(e.target.value)}>
              {shippingOptions
                .map((sO) => ({
                  id: sO.id,
                  label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='col-6' controlId='formBasicPassword'>
            <div>Surname</div>
            <Form.Control
              value={surname}
              name='surname'
              onChange={(e) => setSurname(e.target.value)}
              style={{ height: '28px' }}
              className='mb-3'
              type='Surname'
            />
            <div>Email</div>
            <Form.Control
              value={email}
              name='surname'
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: '28px' }}
              className='mb-3'
              type='Email'
            />
            <div>Country</div>
            <Form.Select
              style={{ height: '28px', padding: '3px', paddingTop: '0px' }}
              className='mb-3'
              fullWidth
              onChange={(e) => setShippingCountry(e.target.value)}>
              {Object.entries(shippingCountries)
                .map(([code, name]) => ({ id: code, label: name }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
            </Form.Select>
            <div>Shipping Distriction</div>
            <Form.Select
              style={{ height: '28px', padding: '3px', paddingTop: '0px' }}
              value={shippingSubdivision}
              onChange={(e) => setShippingSubdivision(e.target.value)}>
              {Object.entries(shippingSubdivisions)
                .map(([code, name]) => ({ id: code, label: name }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
            </Form.Select>
            {errors && <p>invalid</p>}
          </Form.Group>{' '}
          <Button
            className='d-flex mt-4 justify-content-center btn-sm'
            variant='secondary'
            type='submit'>
            next
          </Button>
        </Form>
      </FormProvider>
    </div>
  )
}

// import React, { useState, useEffect } from 'react';
// import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
// import { useForm, FormProvider } from 'react-hook-form';
// import { Link } from 'react-router-dom';

// import { commerce } from '../../lib/commerce';
// import FormInput from './CustomTextField';

// const AddressForm = ({ checkoutToken, test }) => {
//   const [shippingCountries, setShippingCountries] = useState([]);
//   const [shippingCountry, setShippingCountry] = useState('');
//   const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
//   const [shippingSubdivision, setShippingSubdivision] = useState('');
//   const [shippingOptions, setShippingOptions] = useState([]);
//   const [shippingOption, setShippingOption] = useState('');
//   const methods = useForm();

//   const fetchShippingCountries = async (checkoutTokenId) => {
//     const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

//     setShippingCountries(countries);
//     setShippingCountry(Object.keys(countries)[0]);
//   };

//   const fetchSubdivisions = async (countryCode) => {
//     const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

//     setShippingSubdivisions(subdivisions);
//     setShippingSubdivision(Object.keys(subdivisions)[0]);
//   };

//   const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
//     const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

//     setShippingOptions(options);
//     setShippingOption(options[0].id);
//   };

//   useEffect(() => {
//     fetchShippingCountries(checkoutToken.id);
//   }, []);

//   useEffect(() => {
//     if (shippingCountry) fetchSubdivisions(shippingCountry);
//   }, [shippingCountry]);

//   useEffect(() => {
//     if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
//   }, [shippingSubdivision]);

//   return (
//     <>
//       <Typography variant="h6" gutterBottom>Shipping address</Typography>
//       <FormProvider {...methods}>
//         <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
//           <Grid container spacing={3}>
//             <FormInput required name="firstName" label="First name" />
//             <FormInput required name="lastName" label="Last name" />
//             <FormInput required name="address1" label="Address line 1" />
//             <FormInput required name="email" label="Email" />
//             <FormInput required name="city" label="City" />
//             <FormInput required name="zip" label="Zip / Postal code" />
//             <Grid item xs={12} sm={6}>
//               <InputLabel>Shipping Country</InputLabel>
//               <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
//                 {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
//                   <MenuItem key={item.id} value={item.id}>
//                     {item.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InputLabel>Shipping Subdivision</InputLabel>
//               <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
//                 {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
//                   <MenuItem key={item.id} value={item.id}>
//                     {item.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InputLabel>Shipping Options</InputLabel>
//               <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
//                 {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
//                   <MenuItem key={item.id} value={item.id}>
//                     {item.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//           </Grid>
//           <br />
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
//             <Button type="submit" variant="contained" color="primary">Next</Button>
//           </div>
//         </form>
//       </FormProvider>
//     </>
//   );
// };

// export default AddressForm;
