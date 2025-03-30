const axios = require('axios');
const { Book, Author, Category } = require('../models');

const importBooks = async () => {
  const categories = ['fiction', 'science', 'history'];
  
  try {
    for (const categoryName of categories) {
      const [category] = await Category.findOrCreate({
        where: { name: categoryName }
      });

      const response = await axios.get(
        `https://openlibrary.org/subjects/${categoryName}.json?limit=10`
      );
      
      const works = response.data.works;
      if (!works) continue;

      for (const work of works) {
        const [book] = await Book.findOrCreate({
          where: { 
            title: work.title,
            publication_year: work.first_publish_year 
          },
          defaults: {
            category_id: category.category_id
          }
        });

        if (work.authors) {
          for (const authorData of work.authors) {
            const [author] = await Author.findOrCreate({
              where: {
                name: authorData.name
              }
            });
            
            await book.addAuthor(author);
          }
        }
      }
    }
    console.log('Andmed edukalt imporditud!');
  } catch (error) {
    console.error('Andmete importimise viga:', error.message);
  }
};

importBooks();