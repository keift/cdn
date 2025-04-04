# Setup Zapret to bypass DPI

## Keep Hosts content up to date

If you have changed the hostname before, it may not have been updated in `/etc/hosts`. Correct this to avoid problems during installation.

> ```shell
> # Specify the current hostname in /etc/hosts
> sudo sed -i "s/^\(127\.0\.1\.1\s\+\)\S\+/\1$(hostname)/" /etc/hosts
> ```

## Install Nslookup tool

Tool required by Zapret to check DNS during installation.

> ```shell
> # Debian, Ubuntu, Kali, Linux Mint (APT)
> sudo apt install -y dnsutils
>
> # Red Hat, CentOS, Fedora, AlmaLinux, Rocky (DNF / YUM)
> sudo dnf install -y bind-utils
> sudo yum install -y bind-utils
>
> # Arch, Manjaro (Pacman)
> sudo pacman -S --noconfirm bind
> ```

## Install Unzip tool

Essential tool for extracting zip files.

> ```shell
> # Debian, Ubuntu, Kali, Linux Mint (APT)
> sudo apt install -y unzip
>
> # Red Hat, CentOS, Fedora, AlmaLinux, Rocky (DNF / YUM)
> sudo dnf install -y unzip
> sudo yum install -y unzip
>
> # Arch, Manjaro (Pacman)
> sudo pacman -S --noconfirm unzip
> ```

## Change DNS rules

Zapret only bypasses DPI restrictions. But it does not set up a DNS for us. We need to do that ourselves. We are using Yandex DNS here.

> ```shell
> # Unlock /etc/resolv.conf file if it is already locked
> sudo chattr -i /etc/resolv.conf
>
> # Delete /etc/resolv.conf file in case it is set as symlink
> sudo rm -rf /etc/resolv.conf
>
> # Rewrite the /etc/resolv.conf file and specify that we will use Yandex DNS in it
> echo -e "nameserver 77.88.8.8\nnameserver 77.88.8.1" | sudo tee /etc/resolv.conf
>
> # Make the file read-only so that the system cannot change it
> sudo chattr +i /etc/resolv.conf
>
> # Restart NetworkManager for the changes to take effect
> sudo systemctl restart NetworkManager
> ```

_If you want to undo this action you can do the following_

> ```shell
> # Unlock /etc/resolv.conf file if it is already locked
> sudo chattr -i /etc/resolv.conf
>
> # Delete /etc/resolv.conf file to reset it to default
> sudo rm -rf /etc/resolv.conf
>
> # Restart the system for everything to work properly
> sudo reboot
> ```

## Install Zapret

Download the compiled zip file as release on GitHub.

> ```shell
> # Download the compiled zip file from GitHub
> wget https://github.com/bol-van/zapret/releases/download/v70.5/zapret-v70.5.zip
> ```

## Unzip the file

Extract the zip file and then delete it.

> ```shell
> # Unzip the zip file
> unzip ./zapret-v70.5.zip
>
> # Delete the zip file that we no longer need
> rm -rf ./zapret-v70.5.zip
> ```

## Prepare for setup

Install the pre-installation requirements and prepare to perform a clean install.

> ```shell
> # Enter the folder
> cd ./zapret-v70.5
>
> # For a clean installation, remove any installation files that may be present in case an installation has been made before
> ./uninstall_easy.sh
> sudo rm -rf /opt/zapret
>
> # Install requirements
> ./install_prereq.sh
> ./install_bin.sh
> ```

Questions that may arise at this time:

> ```
> select firewall type :
> 1 : iptables
> 2 : nftables
> your choice (default : nftables) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
> ```

## Do Blockcheck

Find the DPI methods implemented by the ISP.

> ```shell
> # Run the test
> ./blockcheck.sh
> ```

Questions that may arise at this time:

> ```
> specify domain(s) to test. multiple domains are space separated.
> domain(s) (default: rutracker.org) : 🟥 [ENTER A WEBSITE DOMAIN NAME BANNED IN YOUR COUNTRY HERE - EXAMPLE: discord.com] 🟥
>
> ip protocol version(s) - 4, 6 or 46 for both (default: 4) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> check http (default : Y) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> check https tls 1.2 (default : Y) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> check https tls 1.3 (default : N) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> how many times to repeat each test (default: 1) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> quick - scan as fast as possible to reveal any working strategy
> standard - do investigation what works on your DPI
> force - scan maximum despite of result
> 1 : quick
> 2 : standard
> 3 : force
> your choice (default : standard) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
> ```

Wait for the test to finish. This may take a few minutes.

After the process is finished, the test results will appear.

Copy the latest setting from these results. Example:

> ```
> ipv4 discord.com curl_test_https_tls12 : nfqws --dpi-desync=fakeddisorder --dpi-desync-ttl=1 --dpi-desync-autottl=5 --dpi-desync-split-pos=1
>                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>                                                                                      MAKE A NOTE FOR IT
> ```

This is an example settings for `nfqws`. It may be different for each person. Make a note of it.

```
--dpi-desync=fakeddisorder --dpi-desync-ttl=1 --dpi-desync-autottl=5 --dpi-desync-split-pos=1
```
