# Lines configured by zsh-newuser-install
setopt SHARE_HISTORY
HISTFILE=~/.histfile
HISTSIZE=999
SAVEHIST=1000
setopt HIST_EXPIRE_DUPS_FIRST
setopt autocd extendedglob nomatch
bindkey -v
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '/home/cadu/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall

# keybinds
bindkey  "^[[H"   beginning-of-line
bindkey  "^[[F"   end-of-line
bindkey  "^[[3~"  delete-char

# autocompletion using arrow keys (based on history)
bindkey '\e[A' history-search-backward
bindkey '\e[B' history-search-forward

## aliases ##

source $HOME/.zsh/aliases

# starship prompt
eval "$(starship init zsh)"

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/home/cadu/google-cloud-sdk/path.zsh.inc' ]; then . '/home/cadu/google-cloud-sdk/path.zsh.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/home/cadu/google-cloud-sdk/completion.zsh.inc' ]; then . '/home/cadu/google-cloud-sdk/completion.zsh.inc'; fi
