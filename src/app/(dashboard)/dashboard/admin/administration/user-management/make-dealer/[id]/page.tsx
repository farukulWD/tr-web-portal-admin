import MakeDealerComponent from '@/components/dealer/MakeDealerComponent'
import React from 'react'

interface Params {
  id: string;
}

export default async function MakeDealerPage({params}: { params: Params }) {
  console.log(params?.id)

  return (
    <div>
      <MakeDealerComponent id={params?.id} />
    </div>
  )
}
