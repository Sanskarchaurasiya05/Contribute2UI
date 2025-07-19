
import { Carousel } from '@mantine/carousel';
import { jobCategory } from '../Data/Data';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

const JobCategory = () => {
  return (
      <div className="mt-20 pb-5">
        <div className='text-4xl text-center font-semibold mb-3 text-mine-shaft-100'>Browse <span className="text-bright-sun-400">InternShip</span> Category</div>
        <div className=" text-lg mx-auto text-mine-shaft-300 text-center w-1/2">
            Explore diverse opportunities tailored to your skills. Start your career journey today!
        </div>
         <Carousel slideSize="22%"  slideGap="md" 
          className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:!opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
           nextControlIcon={<IconArrowRight className="h-8 w-8" />}
      previousControlIcon={<IconArrowLeft className="h-8 w-8"/>}
         >
          
          {
            jobCategory.map((category)=><Carousel.Slide>
           <div className="flex flex-col items-center w-64 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out !shadow-bright-sun-300 ">   
            <div className="p-2 bg-bright-sun-300 rounded-full">
                <img className="h-8 w-8"src={`/Category/${category.name}.png`} alt={category.name}/>
            </div>
            <div className="text-mine-shaft-200 text-lg font-semibold">{category.name}</div>
            <div className='text-sm text-center text-mine-shaft-300'>{category.desc}</div>
            <div className='text-bright-sun-300'>{category.jobs}+ new job posted</div>
        </div>
              </Carousel.Slide>)
          }
        </Carousel>
        
    </div>
  )
}

export default JobCategory