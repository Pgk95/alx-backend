#!/usr/bin/env python3
"""Basic dictionary"""

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    def put(self, key, item):
        """assigning the dictionary"""
        self.cache_data[key] = item
        if key is None or item is None:
            return None

    def get(self, key):
        """returns the value in self.cache_data[key]"""
        if key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
