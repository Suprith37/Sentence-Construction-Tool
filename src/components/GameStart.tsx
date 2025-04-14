



import DrawIcon from '@mui/icons-material/Draw';

import Button from '@mui/material/Button';

import {Header} from './Header';

interface GameStartProps {
  onStart: () => void;
}


export function GameStart({onStart}: GameStartProps){
  return (
    <div
  className="main_container h-screen flex flex-col p-0 m-0"
  style={{ backgroundColor: '#F8F8F8' }}
>
  
    <Header/>
  <div className="sec_container  flex flex-col gap-10 pt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col 
 ">
    {/* <div className="main-container w-[1095px] h-[627px] bg-[rgba(255,255,255,0.6)] rounded-[27.29px] relative shadow-[0.97px_3.899px_19.493px_0_rgba(0,0,0,0.2)] mx-auto my-0" /> */}


    <DrawIcon className="opacity-70 mx-auto relative top-4" sx={{ fontSize:50 }}/> 
    <div className="content_container w-full min-w-full flex flex-col gap-5 p-2">
      <h2 className="title text-3xl  font-[Poppins] font-semibold mx-auto  opacity-70  ">Sentence Construction</h2>
      <p className="sub_content flex  items-center font-['Poppins'] text-1xl
      ont-normal text-[#7c8080] relative text-center ">
        Select the correct words to complete the sentence by arranging <br />
        the provided options in the right order.

      </p>

      <div className="box_container flex flex-row relative top-3">

          {/* <div className="flex w-[640.746px] gap-[32.693px] items-center flex-nowrap relative z-[4] mt-[38.227px] mr-0 mb-0 ml-[229px]"> */}
           <div className="flex w-[181px] flex-col gap-[16.347px] items-center shrink-0 flex-nowrap relative z-[5]">
             <span className="h-[29px] self-stretch shrink-0 basis-auto font-['Poppins'] text-[15px] font-normal relative text-center whitespace-nowrap z-[6]">
               Time Per Question
             </span>
             <span className=" self-stretch shrink-0 basis-auto font-['Poppins'] text-[14px] font-medium  text-[#7c8080]  relative text-center bottom-4 whitespace-nowrap z-[7]">
               30 sec
             </span>
           </div>
           {/* </div> */}
           <div className="w-1 h-12 shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-13/bKGVEo5Pjx.png)] bg-cover bg-no-repeat relative z-[12]" />

        <div className="box_1 flex w-[164.487px] flex-col gap-[16.347px] items-center shrink-0 flex-nowrap relative">
        <span className="h-[29px] self-stretch shrink-0 basis-auto font-['Poppins'] text-[15px] font-normal relative text-center whitespace-nowrap z-[6]">
               Total Questions
             </span>
          <span className=" self-stretch shrink-0 basis-auto font-['Poppins'] text-[14px] font-medium  text-[#7c8080]  relative text-center bottom-4 whitespace-nowrap z-[7]">
               10
             </span>
        </div>

        <div className="w-1 h-12 shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-13/bKGVEo5Pjx.png)] bg-cover bg-no-repeat relative z-[12]" />


        <div className="flex w-[164.487px] flex-col gap-[16.347px] items-center shrink-0 flex-nowrap relative z-[13]">
        <span className="h-[29px] self-stretch shrink-0 basis-auto font-['Poppins'] text-[15px] font-normal relative text-center whitespace-nowrap z-[6]">
               Total Questions
             </span>
          <div className="flex justify-center items-center shrink-0 flex-nowrap relative bottom-4">
               <div className="w-[15px] h-[15px] shrink-0 bg-[url(https:codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-13/aFbryKeG6Z.png)] bg-cover bg-no-repeat rounded-[50%] relative right-1" />
               <span className="h-[23px] shrink-0 basis-auto font-['Inter'] text-[14px] font-medium text-[#7c8080] relative text-left whitespace-nowrap ">
                 0
               </span>
             </div>
           </div>

      </div>

      <div className="btn_container flex flex-row gap-4 h-10  relative  top-3 mx-auto">
      {/* <Button className='' style={{"border" : "1px solid grey","color":"grey" }} variant="outlined">Back</Button> */}
      <Button className="w-40" style={{"backgroundColor" : "grey"}}variant="contained" onClick={onStart}>Start Game</Button>
      
      
      </div>

     
    </div>
  </div>
</div>

  )
}

