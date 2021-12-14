import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Validation } from '../components/Validation';
import { create } from '../service/Customer';

const initialFValues = {
   name:"",
   phoneNumber:"",
   pincode:"",
   locality:"",
   address:"",
   city:"",
   landmark:"",
   type:""
}
export default function CustomerDetails({showCustomer}) {
    const validate = (fieldValues = values) => {
        let temp = {
            ...errors
        }
        if('phoneNumber' in fieldValues)
        temp.phoneNumber=(/^[1-9][0-9]{9}$/).test(fieldValues.phoneNumber)?"":"phone number should consists of 10 digits."
      
        setErrors({
             // eslint-disable-next-line
            ...temp
        })
       
        if (fieldValues === values) 
            return Object.values(temp).every(x => x === "")
    }
    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = Validation(initialFValues,true,validate);
const data={
    name:values.name,
    phoneNumber:values.phoneNumber,
    pinCode:values.pincode,
    locality:values.locality,
    address:values.address,
    city:values.city,
    landMark:values.landMark,
    type:values.type
}
const handleSubmit=()=>{
create(data)
.then((res)=>console.log(res))
.catch((err)=>console.log(err));
}
    return (
    <>
         <Paper variant="outlined" sx={{ m: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } ,maxWidth:'724px'}}>
        <Typography variant="h6" gutterBottom>
            Customer Details
        </Typography>
       {(showCustomer)?( <Grid container
            spacing={3}>
            <Grid item
                xs={12}
                sm={6}>
                <TextField required id="name" name="name" label=" Name" fullWidth variant="outlined" onChange={handleInputChange}/>
            </Grid>
            <Grid item
                xs={12}
                sm={6}>
                <TextField required id="phoneNumber" name="phoneNumber" label="Contact Number" fullWidth  variant="outlined" onChange={handleInputChange}/>
            </Grid>
            <Grid item
                xs={12}
                sm={6}>
                <TextField required id="pincode" name="pincode" label=" Pincode" fullWidth variant="outlined" onChange={handleInputChange}/>
            </Grid>
            <Grid item
                xs={12}
                sm={6}>
                <TextField required id="locality" name="locality" label="Locality" fullWidth  variant="outlined" onChange={handleInputChange}/>
            </Grid>
            <Grid item
                xs={12}>
                <TextField id="address" name="address" label="Address Line " fullWidth  variant="outlined" onChange={handleInputChange}/>
            </Grid>
            <Grid item
                xs={12}
                sm={6}>
                <TextField required id="city" name="city" label="City/Town" fullWidth  variant="outlined" onChange={handleInputChange}/>
            </Grid>
            <Grid item
                xs={12}
                sm={6}>
                <TextField id="landmark" name="landmark" label="Landmark" fullWidth variant="outlined" onChange={handleInputChange}/>
            </Grid>
           <Grid item
           xs={12}
           sm={6}>
               <FormControl component="fieldset">
                    <FormLabel component="legend">Type</FormLabel>
                    <div><br />
                    <RadioGroup row aria-label="type" name="type" onChange={handleInputChange}>
                        <FormControlLabel value="home" control={<Radio size='small'/>} label="Home" style={{paddingLeft:"0.75em"}}/>
                        <FormControlLabel value="work" control={<Radio size='small' />} label="Work" style={{paddingLeft:"1em"}} />
                        <FormControlLabel value="other" control={<Radio size='small'/>} label="Other" style={{paddingLeft:"1em"}} />
                    </RadioGroup>
                    </div>
                </FormControl>
           </Grid>
           <div align="right" style={{paddingTop:"5.5em", paddingLeft:"12.5em"}}>
           <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    onClick={(e)=>{handleSubmit()}}
                  >
                   Continue
                  </Button>
                  </div>
        </Grid> ):" "}</Paper>
    </>
    )
}