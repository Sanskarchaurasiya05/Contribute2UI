
import { useEffect, useState } from 'react';
import fields from '../../Data/Profile';
import SelectInput from './SelectInput'
import { Button, Checkbox, Textarea } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { useDispatch, useSelector } from 'react-redux';
import { isNotEmpty, useForm } from '@mantine/form';
import { changeProfile } from '../../Slices/ProfileSlice';
import { successNotification } from '../../Services/NotificationService';



export const ExpInput = (props:any) => {
   const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
       const select = fields;
      const [startDate , setStartDate] = useState<Date | null>(new Date());
      const [endDate , setEndDate] = useState<Date | null>(new Date());
        const [checked,setChecked]=useState(false);
       const[desc , setDesc] = useState("As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process.");
 
        const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: '',
            company: '',
            location: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            working: false

        },
        validate:{
            title: isNotEmpty('Title cannot be empty'),
            company: isNotEmpty('Company cannot be empty'),
            location: isNotEmpty('Location cannot be empty'),
            description: isNotEmpty('Description cannot be empty')
        }
    });
    useEffect(() => {
        if (!props.add) form.setValues({ 'title': props.title, 'company': props.company, 'location': props.location, 'description': props.description, 'startDate': new Date(props.startDate), 'endDate': new Date(props.endDate), 'working': props.working });
    }, []);

    const handleSave = () => {
        form.validate();
        if(!form.isValid())return;
        let exp = [...profile.experiences];
        if (props.add) {
            exp.push(form.getValues());
            exp[exp.length - 1].startDate = form.getValues().startDate.toISOString();
            exp[exp.length - 1].endDate = form.getValues().endDate.toISOString();
        }
        else {
            exp[props.index] = form.getValues();
            exp[props.index].startDate = form.getValues().startDate.toISOString();
            exp[props.index].endDate = form.getValues().endDate.toISOString();
        }
        let updatedProfile = { ...profile, experiences: exp };
        
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", `Experience ${props.add?"Added":"Updated"} Successfully`);
    }


       return (
    <div className='flex flex-col gap-3'>
        <div className='text-lg font-semibold'>{props.add?"Add":"Edit"} Experience</div>
         <div className="flex gap-10 [&>*]:w-1/2">
                                <SelectInput {...select[0]}/>
                                <SelectInput {...select[1]}/>
                          </div>
                          <SelectInput {...select[2]}/>
                          <Textarea withAsterisk label="summary" value={desc} placeholder='Enter Summary' autosize minRows={3} onChange={(event:any) => setDesc(event.currentTarget.value)}/>
                            <div className='flex gap-10 [&>*]:w-1/2'>
                            <MonthPickerInput {...form.getInputProps("startDate")} maxDate={form.getValues().endDate || undefined} withAsterisk label="Start Date"/>
                           
                             <MonthPickerInput disabled={form.getValues().working} minDate={form.getValues().startDate || undefined} maxDate={new Date()} withAsterisk label="End Date" placeholder="Pick date" {...form.getInputProps("endDate")}/>
                             
                           
                            </div>
                              <Checkbox autoContrast label="Currently working here" checked={form.getValues().working} onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)}/>
                                <div className='my-3 flex gap-5'>
                                  <Button onClick={handleSave} color="brightSun.4" variant="outline">Save</Button>
                                                             <Button onClick={()=>props.setEdit(false)} color="red.8" variant="light">Cancel</Button>
                                </div>
    </div>
  )
}
