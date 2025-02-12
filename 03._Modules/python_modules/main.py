from my_module import file_one, file_two
file_one.ClassA()

from my_module.file_one import ClassA
ClassA()


import my_module
my_module.ClassA()

# From __init__.py. This is the recommended way to import modules
from my_module import ClassA, ClassB
ClassA()
ClassB()