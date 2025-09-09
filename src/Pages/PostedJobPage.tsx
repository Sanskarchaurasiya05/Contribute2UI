import { Divider } from '@mantine/core'

import PostedJob from '../Components/PostedJob/PostedJob'

const PostedJobPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
       <Divider size="xs" />
          <div className="flex gap-5 justify-between">
           <PostedJob/>
          </div>
      </div>
  )
}

export default PostedJobPage