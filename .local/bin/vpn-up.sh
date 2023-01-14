$!/bin/bash

nmcli c up ima.carlossiqueira | cut -d"(" -f 1 | while read OUTPUT; do dunstify -u normal "$OUTPUT"; done