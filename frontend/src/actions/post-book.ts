// 책 추가

interface BookData {
  title: string;
  author: string;
  isbn: string;
  publishedDate: string;
  genre: string;
  description: string;
  language: string;
  pageCount: number;
  publisher: string;
  price: string;
}

export const postBook = async (bookData: BookData) => {
  try {
    console.log(`bookData in postBook`, bookData);
    const url = `http://dev.webprolist:8080/api/books`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      status: "success",
      data: result
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        status: "error",
        error: e.message
      };
    }

    return {
      status: "error",
      error: "알 수 없는 에러가 발생했습니다."
    };
  }
};
