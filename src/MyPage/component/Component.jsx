import Myblock from "./Myblock";
import { useRecoilState } from "recoil";
import { playInfoState } from '../../atoms';
export default function Component() {
  const [playInfos] = useRecoilState(playInfoState); //일단은 놀이터 정보로 불러왔음 

  return ( //하나의 블록으로 묶인 것
    <div className='block-container'>
      {playInfos.map((e, i) => (
        <div key={i} >
          <Myblock
            img={e.img}
            category={e.category}
            date={e.date}
            time={e.time}
            name={e.name}
          />
          
        </div>
      ))}
    </div>
  );
}
