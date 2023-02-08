type Params = {
  currentPage: number;
  totalPages: number;
  boundaryCount?: number;
  siblingCount: number;
};

export const usePaginationRange = ({
  currentPage = 1,
  totalPages = 1,
  boundaryCount = 1,
  siblingCount = 1,
}: Params) => {
  // https://dev.to/namirsab/comment/2050
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount,
      // Lower boundary when page is high
      totalPages - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  // Basic list of items to render
  // e.g. itemList = [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
  const itemList = [
    ...startPages,
    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? ["..."]
      : boundaryCount + 1 < totalPages - boundaryCount
      ? [boundaryCount + 1]
      : []),
    // Sibling pages
    ...range(siblingsStart, siblingsEnd),
    // End ellipsis
    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? ["..."]
      : totalPages - boundaryCount > boundaryCount
      ? [totalPages - boundaryCount]
      : []),
    ...endPages,
  ];

  return {
    items: itemList,
    currentPage: currentPage,
  };
};

const getRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const clamp = (number: number, lower: number, upper: number) => {
  return Math.min(Math.max(number, lower), upper);
};

export const pagination2 = (
  currentPage: number,
  pageCount: number,
  pagesShown: number,
  MINIMUM_PAGE_SIZE: number = 5
) => {
  let delta: number;
  currentPage = clamp(currentPage, 1, pageCount);
  pagesShown = clamp(pagesShown, MINIMUM_PAGE_SIZE, pageCount);
  const centerPagesShown = pagesShown - 5;
  const boundaryPagesShown = pagesShown - 3;

  if (pageCount <= pagesShown) {
    delta = pagesShown;
  } else {
    delta =
      currentPage < boundaryPagesShown ||
      currentPage > pageCount - boundaryPagesShown
        ? boundaryPagesShown
        : centerPagesShown;
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  };

  if (range.start - 1 === 1 || range.end + 1 === pageCount) {
    range.start += 1;
    range.end += 1;
  }
  let pages: (string | number)[] =
    currentPage > delta
      ? getRange(
          Math.min(range.start, pageCount - delta),
          Math.min(range.end, pageCount)
        )
      : getRange(1, Math.min(pageCount, delta + 1));

  if (currentPage > pageCount - boundaryPagesShown && pageCount > pagesShown) {
    pages = getRange(pageCount - delta, pageCount);
  }

  const withDots = (value: number, pair: (string | number)[]) =>
    pages.length + 1 !== pageCount ? pair : [value];
  const lastPage = pages[pages.length - 1];

  if (pages[0] !== 1) {
    pages = withDots(1, [1, "..."]).concat(pages);
  }

  if (lastPage && lastPage < pageCount) {
    pages = pages.concat(withDots(pageCount, ["...", pageCount]));
  }

  return {
    pages,
    currentPage,
  };
};
