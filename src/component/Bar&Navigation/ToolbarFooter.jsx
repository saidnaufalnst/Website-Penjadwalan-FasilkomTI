import React from 'react';

const ToolbarFooter = ({ colorAndSemester }) => {
  return (
    <div className="bg-white w-full h-[76px]">
      <div className="flex justify-center h-full items-center w-full gap-24">
        {colorAndSemester.map(({ semester, backgroundColor }) => (
          <div key={semester} className='flex items-center gap-1'>
            <span style={{ backgroundColor }} className='box-info-semester rounded'></span>
            <span className='text-xs'>{`Semester ${semester}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ToolbarFooter