#!/usr/bin/env python3
"""Pagination"""

import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """takes two arguments with specified integer values."""

        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0

        start, end = index_range(page, page_size)
        return self.dataset()[start:end]

    def get_hyper(self, page: int = 1, page_size=10) -> dict:
        """returns key value pairs that are listed below"""
        total = math.ceil(len(self.dataset()) / page_size)
        dict = {
            'page_size': len(self.get_page(page, page_size)),
            'page': page,
            'data': self.get_page(page, page_size),
            'next_page': page + 1 if page + 1 < total else None,
            'prev_page': page - 1 if page + 1 > total else None,
            'total_pages': total
        }
        return dict


def index_range(page: int, page_size: int) -> tuple:
    """return a tuple of size two containing a
    start index and an end index"""

    return ((page - 1) * page_size, page * page_size)
