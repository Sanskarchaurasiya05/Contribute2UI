import { Button, TextInput } from '@mantine/core'
import  { useState } from 'react'
import fields from '../../Data/Profile';
import SelectInput from './SelectInput';
import { MonthPickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';



const CertiInput = (props:any) => {
    const select = fields;
    const[issueDate,setIssueDate]=useState<Date | null>(new Date());
     const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name:'',
            issuer:'',
            issueDate:new Date(),
            certificateId:''
        },
         validate:{
            name: isNotEmpty('Title cannot be empty'),
            issuer: isNotEmpty('Issuer cannot be empty'),
            issueDate: isNotEmpty('Issue Date cannot be empty'),
            certificateId: isNotEmpty('Certificate ID cannot be empty')
        }
    });

     const handleSave = () => {
        form.validate();
        if(!form.isValid())return;
        let certis = [...profile.certifications];
        if (props.add) {
            certis.push(form.getValues());
            certis[certis.length - 1].issueDate = form.getValues().issueDate.toISOString();
        }
        else {
            certis[props.index] = form.getValues();
            certis[props.index].issueDate = form.getValues().issueDate.toISOString();
        }
        
        let updatedProfile = { ...profile, certifications: certis };
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", `Certificate Added Successfully`);
    }

  return (
    <div className='flex flex-col gap-8'>
        <div className='text-lg font-semibold'>Add Certificate</div>
         <div className="flex gap-10 [&>*]:w-1/2">
                <TextInput label="Title" withAsterisk placeholder="Enter Title"/>
                <SelectInput {...select[1]} />
                </div>
                 <div className="flex gap-10 [&>*]:w-1/2">
                <TextInput {...form.getInputProps('certificateId')} withAsterisk label="Certificate ID" placeholder="Enter ID" />
                 <MonthPickerInput {...form.getInputProps('issueDate')} maxDate={new Date()} withAsterisk label="Issue Date" placeholder="Pick date"  />
               
                </div>
                 <div className='flex gap-5'>
             <Button onClick={handleSave} variant="light">Save</Button>
             <Button onClick={()=>props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
                                                </div>
    </div>
  )
}

export default CertiInput