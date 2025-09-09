import { Divider, RangeSlider } from "@mantine/core"
import { dropdownData } from "../../Data/JobsData"
import MultiInput from "./MultiInput"
import { useState } from "react";


const SearchBar = () => {
  const [value, setValue] = useState<[number,number]>([1, 100]);
  return (
 <div className="flex px-5 py-8">
   
      {
  dropdownData.map((item, index) => (
    <div key={index} className="flex items-center w-1/5 space-x-2">
      <MultiInput {...item} />
      <Divider orientation="vertical" size="sm" />
    </div>
  ))
}

    

    <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
    <div className="flex text-sm justify-between">
      <div>
        Salary
      </div>
      <div>&#8377;{value[0]} LPA - &#8377;{value[1]} LPA</div>
    </div>
      <RangeSlider color="brightSun.4" size="xs" value={value} labelTransitionProps={{
        transition: 'skew-down',
        duration: 150,
        timingFunction: 'linear'
      }} 
      onChange={setValue} />
      </div>
  
 </div>
  )
}

export default SearchBar