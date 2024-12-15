// 책 목록 조회

export const getBooks = async (
  page: number = 1,
  titleSearch: string,
  authorSearch: string,
  limit: number = 10
) => {
  try {
    const baseUrl = "http://dev.webprolist:8080/api/books";

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    if (titleSearch) params.append("title", titleSearch);
    if (authorSearch) params.append("author", authorSearch);
    const url = `${baseUrl}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      return {
        status: "error",
        error: "책을 가져오는데 실패했습니다."
      };
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
      error: "알 수 없는 오류 발생"
    };
  }
};
