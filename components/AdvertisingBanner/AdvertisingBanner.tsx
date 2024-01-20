import React from 'react'
import { Card, CardContent } from '../ui/card'

function AdvertisingBanner() {
  return (
    <div className="advertisingBanner max-h-[20vh] py-10">
        <Card className='py-5'>
            <CardContent>
                <div className="text-center">
                    <span className="text-lg font-semibold mb-2">
                        Possible space for ads
                    </span>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default AdvertisingBanner