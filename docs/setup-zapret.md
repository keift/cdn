# Setup Zapret to bypass DPI

## 1- Keep Hosts content up to date

If you have changed the hostname before, it may not have been updated in `/etc/hosts`. Correct this to avoid problems during installation.

> ```shell
> # Specify the current hostname in /etc/hosts
> sudo sed -i "s/^\(127\.0\.1\.1\s\+\)\S\+/\1$(hostname)/" /etc/hosts
> ```

## 2- Install Nslookup tool

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

## 3- Install Unzip tool

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

## 4- Change DNS rules

Zapret only bypasses DPI restrictions. But it does not set up a DNS for us. We need to do that ourselves. We are using Yandex DNS here.

> ```shell
> # Unlock /etc/resolv.conf file if it is already locked
> sudo chattr -i /etc/resolv.conf
>
> # Delete the /etc/resolv.conf file as it may be set as a symlink
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

_If you want to undo this action you can do the following:_

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

## 5- Install Zapret

Download the compiled zip file as release on GitHub.

> ```shell
> # Go to the home directory
> cd
>
> # Download the compiled zip file from GitHub
> wget https://github.com/bol-van/zapret/releases/download/v70.5/zapret-v70.5.zip
> ```

## 6- Unzip the file

Extract the zip file and then delete it.

> ```shell
> # Unzip the zip file
> unzip ./zapret-v70.5.zip
>
> # Delete the zip file that we no longer need
> rm -rf ./zapret-v70.5.zip
> ```

## 7- Prepare for setup

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

> ```shell
> # FIRST QUESTION
> select firewall type :
> 1 : iptables
> 2 : nftables
> your choice (default : nftables) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
> ```

## 8- Do Blockcheck

Find the DPI methods implemented by the ISP.

> ```shell
> # Run the test
> ./blockcheck.sh
> ```

Questions that may arise at this time:

> ```shell
> # FIRST QUESTION
> specify domain(s) to test. multiple domains are space separated.
> domain(s) (default: rutracker.org) : 🟥 [ENTER A WEBSITE DOMAIN NAME BLOCKED IN YOUR COUNTRY HERE - EXAMPLE: discord.com] 🟥
>
> # SECOND QUESTION
> ip protocol version(s) - 4, 6 or 46 for both (default: 4) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # THIRD QUESTION
> check http (default : Y) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # FOURTH QUESTION
> check https tls 1.2 (default : Y) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # FIFTH QUESTION
> check https tls 1.3 (default : N) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # SIXTH QUESTION
> how many times to repeat each test (default: 1) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # SEVENTH QUESTION
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

> ```shell
> ipv4 discord.com curl_test_https_tls12 : nfqws --dpi-desync=fakeddisorder --dpi-desync-ttl=1 --dpi-desync-autottl=5 --dpi-desync-split-pos=1
>                                                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>                                                                                      MAKE A NOTE FOR IT
> ```

This is an example settings for **nfqws**. It may be different for each person. Make a note of it.

```shell
--dpi-desync=fakeddisorder --dpi-desync-ttl=1 --dpi-desync-autottl=5 --dpi-desync-split-pos=1
```


## 9- Install Zapret

Once everything is complete, we can start installing Zapret.

```shell
# Start the installation
./install_easy.sh
```

Questions that may arise at this time:

> ```shell
> # FIRST QUESTION
> do you want the installer to copy it for you (default : N) (Y/N) ? 🟥 [TYPE "Y"] 🟥
>
> # SECOND QUESTION
> select firewall type :
> 1 : iptables
> 2 : nftables
> your choice (default : nftables) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # THIRD QUESTION
> enable ipv6 support (default : N) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # FOURTH QUESTION
> select flow offloading :
> 1 : none
> 2 : software
> 3 : hardware
> your choice (default : none) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # FIFTH QUESTION
> enable tpws socks mode on port 987 ? (default : N) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # SIXTH QUESTION
> enable tpws transparent mode ? (default : N) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # SEVENTH QUESTION
> enable nfqws ? (default : N) (Y/N) ? 🟥 [TYPE "Y"] 🟥
>
> # EIGHTH QUESTION
> do you want to edit the options (default : N) (Y/N) ? 🟥 [TYPE "Y"] 🟥
> ```

Then we write the **nfqws** settings that we just copied to `NFQWS_OPT`. Example:

> ```shell
> NFQWS_PORTS_TCP=80,443
> NFQWS_PORTS_UDP=443
> NFQWS_TCP_PKT_OUT=9
> NFQWS_TCP_PKT_IN=3
> NFQWS_UDP_PKT_OUT=9
> NFQWS_UDP_PKT_IN=0
> NFQWS_PORTS_TCP_KEEPALIVE=
> NFQWS_PORTS_UDP_KEEPALIVE=
> NFQWS_OPT="--dpi-desync=fakeddisorder --dpi-desync-ttl=1 --dpi-desync-autottl=5 --dpi-desync-split-pos=1"
>            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
>                                                 YOUR SETTINGS HERE
> ```

Then save with **CTRL + S** and close with **CTRL + X**.

Let's continue with the questions:

> ```shell
> # EIGHTH QUESTION
> do you want to edit the options (default : N) (Y/N) ? 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # NINTH QUESTION
> LAN interface :
> 1 : NONE
> 2 : docker0
> 3 : lo
> 4 : wlp0s20f3
> your choice (default : NONE) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # TENTH QUESTION
> WAN interface :
> 1 : ANY
> 2 : docker0
> 3 : lo
> 4 : wlp0s20f3
> your choice (default : ANY) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
>
> # ELEVENTH QUESTION
> select filtering :
> 1 : none
> 2 : ipset
> 3 : hostlist
> 4 : autohostlist
> your choice (default : none) : 🟩 [LEAVE THIS QUESTION BLANK] 🟩
> ```

## 10- Finish the installation

All done! We are done with this folder of Zapret anymore. We can delete it.

> ```shell
> # Come back
> cd ..
>
> # Delete the folder
> rm -rf ./zapret-v70.5
> ```

🎉 That's it! You have now overcome all access barriers. Long live freedom!
