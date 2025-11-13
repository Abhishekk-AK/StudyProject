export default function GetAverageRating(ratingArr) {
    if (ratingArr?.length === 0) 
        return 0
   
    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
                                                acc += curr.rating
                                                return acc
                                                }, 0)
  
    const multiplier = Math.pow(10, 1)
    const averageReviewCount =
        Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
  
    return averageReviewCount
  }