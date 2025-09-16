class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  //filter method
  filter() {
    const queryObj = { ...this.queryStr };
    const excluded = ['page', 'sort', 'limit', 'fields']; // Fixed typo in 'fields'
    excluded.forEach((el) => delete queryObj[el]);

    // 2) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    // Replace gte, gt, lte, lt with MongoDB operators
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (matchedWord) => `$${matchedWord}`,
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  //Sort
  sort() {
   if (this.queryStr.sort) {
  const sortBy = this.queryStr.sort.split(',').join(' ');
  this.query = this.query.sort(sortBy);
} else {
  this.query = this.query.sort('-createdAt');
}
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
const page = this.queryStr.page * 1 || 1;
const limitValue = this.queryStr.limit * 1 || 100;
const skipValue = (page - 1) * limitValue;
this.query = this.query.skip(skipValue).limit(limitValue);
    return this;
  }
}

module.exports = APIFeatures