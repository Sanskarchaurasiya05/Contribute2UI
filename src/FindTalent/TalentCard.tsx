import { Avatar, Divider, Text } from '@mantine/core'
import { IconBookmark, IconClockHour3, IconHeart } from '@tabler/icons-react'

const TalentCard = (props:any) => {
  return (
   <div data-aos="fade-up"  className="p-4 rounded-xl bg-mine-shaft-900 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400  transition duration-300 ease-in-out w-72 sm-mx:w-full flex flex-col gap-3">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-full">
                    <Avatar size="lg" src={`/avatar.png`} alt="" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-semibold ">Jarred Wood</div>
                    <div className="text-xs text-mine-shaft-300">Software Engineer &bull; Googel</div>
                </div>
            </div>
           <IconHeart className='cursor-pointer text-mine-shaft-300 stroke={1.5}'/>
        </div>
        <div className="flex gap-2 flex-wrap">
            <div className="p-2 py-1 bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">React</div>
            <div className="p-2 py-1  bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">Spring Boot</div>
            <div className="p-2 py-1  bg-mine-shaft-800 text-bright-sun-400 rounded-lg text-xs">MangoDB</div>
        </div>
        <div>
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>{props.description}
            </Text>
        </div>
        <Divider color="mineShaft.7" size="xs" />
        <div className="flex justify-between">
            <div className="font-semibold text-mine-shaft-200">&#8377;{props.package} LPA</div>
            <div className="text-xs flex gap-1 items-center text-mine-shaft-400">
                <IconClockHour3 className="h-5 w-5" stroke={1.5} />{props.postedDaysAgo} 12 days ago
            </div>
        </div>
    </div>
  )
}

export default TalentCard