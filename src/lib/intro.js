const intro = 

`---
title: {{filename}}
created: {{date}}
edited: {{edit}}
author: {{author}}
---


![link-text](https://picsum.photos/1000/200?random=41)

# My Project

![badge](https://img.shields.io/badge/Build_status-successful-blue)
![badge](https://img.shields.io/badge/Version-0.0.349-color)
![badge](https://img.shields.io/badge/Made_with_<3-red)


Foobar is a Python library for dealing with word pluralization.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

\`\`\`bash
pip install foobar
\`\`\`


## Usage

\`\`\`python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
\`\`\`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[![](https://img.shields.io/badge/MIT-blue)](https://choosealicense.com/licenses/mit/)

`
export default intro