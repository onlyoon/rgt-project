// 책 조회

export const getBook = async (id: number) => {
  try {
    const url = `http://dev.webprolist.click:8080/api/books/${id}`;

    const response = await fetch(url);
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
