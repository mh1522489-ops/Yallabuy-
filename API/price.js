export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { asin } = req.query;
  
  if (!asin) {
    return res.status(400).json({ error: 'ASIN مطلوب' });
  }

  try {
    const response = await fetch(
      `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=US`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
      }
    );
    
    const data = await response.json();
    
    res.json({
      asin,
      price: data.data?.product_price || data.data?.product_original_price || 'غير متوفر',
      title: data.data?.product_title || '',
      image: data.data?.product_photo || '',
      link: `https://amazon.com/dp/${asin}?tag=${process.env.AMAZON_TAG || ''}`
    });
    
  } catch (err) {
    res.status(500).json({ error: 'فشل', details: err.message });
  }
}
