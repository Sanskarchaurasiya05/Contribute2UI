import TalentCard from "../FindTalent/TalentCard";
import { talents } from "../Data/TalentData";
const RecommendTalent = (props:any) => {
    
    return <div>
        <div className="text-xl font-semibold mb-5">Recommended Talent</div>
        <div className="flex flex-col  flex-wrap gap-5 justify-between">
        {
            talents.map((talent:any, index:any) =>index<4 && <TalentCard key={index} {...talent}  />)
        }
    </div>
    </div>
}
export default RecommendTalent;