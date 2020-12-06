"""
Script to convert complicated icon filenames to ones accepted by speck.
Icons downloaded from: https://icons8.com/icon/pack/alphabet/color.
"""

import shutil
import sys


input_dir = sys.argv[1]
output_dir = sys.argv[2]
n_icons = int(sys.argv[3])

for n in range(1, n_icons+1):
    src = f"{input_dir}/icons8-{n}-50.png"
    dest = f"{output_dir}/marker{n}.png"
    shutil.copyfile(src, dest)
