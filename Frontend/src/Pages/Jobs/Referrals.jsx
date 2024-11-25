import React, { useEffect, useState } from 'react';
import BaseLayout from '../../Layouts/BaseLayout';
import { JobReferralCard } from '../../Components/JobReferralCard';
import axiosInstance from '../../Helpers/axiosInstance';

function Referrals() {

    const [referrals,setReferrals] = useState([])

    async function loadReferrals(){
        const response = await axiosInstance.get('/refer')
        setReferrals(response?.data?.referrals)
    }

    useEffect(()=>{
        loadReferrals()
    },[])
  return (
    <BaseLayout>
      <div className="flex flex-wrap justify-center gap-6 p-4 pt-32 pb-32">

        {
            referrals.length > 0 && (
                referrals.map(ref => <JobReferralCard key={ref._id} data={ref} link={ref.link || null}/>)
            )
        }
       
      </div>
    </BaseLayout>
  );
}

export default Referrals;
