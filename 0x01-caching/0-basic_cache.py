#!/usr/bin/env python3
"""Basic dictionary"""

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """Basic Cache that inherits from his
       parent class BaseCaching
    """
    def put(self, key, item):
        """assigning the dictionary"""
        if key is None or item is None:
            return None
        else:
            self.cache_data[key] = item

    def get(self, key):
        """returns the value in self.cache_data[key]"""
        if key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
