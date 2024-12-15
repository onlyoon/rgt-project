// 책 삭제

export const deleteBook = async (id: number) => {
  try {
    const url = `http://dev.webprolist:8080/api/books/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
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
