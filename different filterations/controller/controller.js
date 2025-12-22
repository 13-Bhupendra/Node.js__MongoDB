import { Data } from "../model/dataModel.js";


// data post 
export const post =  async (req ,res)=> {
    try {
        const result =  await Data.create(req.body)
        res.json({message : "task added" , result});
    } catch (error) {
        res.status(500).json({message : "Data not added " ,  error : error.message});
    }
}

//  a) Fetch all products.
export const fetchAllData = async (req , res) => {
    try {
        const result = await Data.find();
        res.status(200).json({message : "Data fetched Successfully" , result})
    } catch (error) {
        res.status(500).json({message : "Data not fetched " ,  error : error.message});
    }
}

//Fetch products by ID. 
export const getSingleData = async (req , res)=> {
    try {
        const {id} = req.params
        const result = await Data.findById(id);
        if (!result) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.status(200).json(result);
    } catch (error) {
          res.status(500).json({message : "Data not Found !" , error : error.message})
    }
}

// c) Search products by productName 
export const searchByName = async (req , res)=> {
    try {
        const {productName} = req.query
        const result = await Data.find({
            productName: { $regex: productName, $options: "i" }
         });
        res.status(200).json(result);

    } catch (error) {
          res.status(500).json({message : "Data not Found !" , error : error.message})
        
    }
}


// d) Search by brand
export const searchByBrand = async (req, res) => {
  try {
    const { brand } = req.query;

    const result = await Data.find({ brand });

    res.status(200).json(result);
  } catch (error) {
              res.status(500).json({message : "Data not Found !" , error : error.message})

  }
};

// e) Search by multiple fields 
export const multiFieldSearch = async (req, res) => {
  try {
    const { productName, category, brand } = req.query;

    const result = await Data.find({
      productName: { $regex: productName, $options: "i" },
      category,
      brand
    });

    res.status(200).json(result);
  } catch (error) {
              res.status(500).json({message : "Data not Found !" , error : error.message})

  }
};


// f) Fetch by category 
export const getByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const result = await Data.find({ category });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// g) Filter by price range
export const filterByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;

    const result = await Data.find({
      price: {
        $gte: Number(min),
        $lte: Number(max)
      }
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// h) Filter by rating above given value
export const filterByRating = async (req, res) => {
  try {
    const { rating } = req.query;

    const result = await Data.find({
      rating: { $gte: Number(rating) }
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// i) Sort by price
export const sortByPrice = async (req, res) => {
  try {
    const { order } = req.query; 

    const sortOrder = order === "desc" ? -1 : 1;

    const result = await Data.find().sort({ price: sortOrder });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};