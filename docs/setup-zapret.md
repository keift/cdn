# Setup Zapret

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

## 2- Install Unzip tool

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

## 2- Change DNS

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

## 3- Install Zapret

Download the compiled zip file as release on GitHub.

> ```shell
> # Download the compiled zip file from GitHub
> wget https://github.com/bol-van/zapret/releases/download/v70.5/zapret-v70.5.zip
> ```

## 4- Unzip the file

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
> cd ./zapret-v70.5.zip
>
> # For a clean installation, remove any installation files that may be present in case an installation has been made before
> ./uninstall_easy.sh
> sudo rm -rf /opt/zapret
>
> # Install requirements
> ./install_prereq.sh
> ./install_bin.sh
> ```

## Do Blockcheck

Find the DPI methods implemented by the ISP.

> ```shell
> ./blockcheck.sh
> ```
