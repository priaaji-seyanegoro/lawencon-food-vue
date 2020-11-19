<template>
  <div>
    <Navbar :updatedCart="carts" />
    <div class="container text-center">
      <div class="row mt-4">
        <!-- breadcrumb  -->
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Keranjang
              </li>
            </ol>
          </nav>
        </div>

        <!-- list cart  -->
        <div class="table-responsive mt-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Makanan</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Harga</th>
                <th scope="col">Total Harga</th>
                <th scope="col">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in carts" :key="cart.id">
                <th>{{ index + 1 }}</th>
                <td>
                  <img
                    :src="`/images/food-image/${cart.product.gambar}`"
                    class="img-fluid shadow"
                    width="250"
                  />
                </td>
                <td>
                  <strong>{{ cart.product.nama }}</strong>
                </td>
                <td>{{ cart.desc_order ? cart.desc_order : "-" }}</td>
                <td>{{ cart.qty_order }}</td>
                <td align="right">Rp. {{ cart.product.harga }}</td>
                <td align="right">
                  <strong>Rp. {{ cart.product.harga * cart.qty_order }}</strong>
                </td>
                <td align="center" class="text-danger">
                  <b-icon-trash
                    class="delete-cart"
                    @click="deleteCart(cart.id)"
                  />
                </td>
              </tr>

              <tr>
                <td colspan="6" align="right">
                  <strong>Total Harga :</strong>
                </td>
                <td align="right">
                  <strong>Rp. {{ totalHarga }}</strong>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="row justify-content-end text-left">
        <div class="col-md-4">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama :</label>
              <input type="text" class="form-control" v-model="pesan.nama" />
            </div>
            <div class="form-group">
              <label for="noMeja">Nomor Meja :</label>
              <input
                type="number"
                class="form-control"
                min="0"
                oninput="this.value = Math.abs(this.value)"
                v-model="pesan.noMeja"
              />
            </div>

            <button
              type="submit"
              class="btn btn-success float-right"
              @click="checkoutPesanan"
            >
              <b-icon-cart />Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import axios from "axios";

export default {
  name: "Cart",
  components: {
    Navbar,
  },
  data() {
    return {
      carts: [],
      pesan: {},
    };
  },
  methods: {
    setCart: function (data) {
      this.carts = data;
    },
    deleteCart(id) {
      axios
        .delete(`http://localhost:3000/keranjangs/${id}`)
        .then(() => {
          this.$toast.error("Sukses Hapus Keranjang", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
          // Update Data keranjang
          axios
            .get("http://localhost:3000/keranjangs")
            .then((response) => this.setCart(response.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkoutPesanan: function () {
      if (this.pesan.nama && this.pesan.noMeja && this.carts.length !== 0) {
        // add cart to pesan obj
        this.pesan.keranjangs = this.carts;
        axios
          .post("http://localhost:3000/pesanans", this.pesan)
          .then(() => {
            // each all cart and fetch to delete endpoint till cart empty
            this.carts.map(function (item) {
              return axios
                .delete("http://localhost:3000/keranjangs/" + item.id)
                .catch((error) => console.log(error));
            });
            //redirect
            this.$router.push({ path: "/checkout-success" });
            this.$toast.success("Sukses Dipesan", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        if (this.carts.length === 0) {
          this.$toast.error(
            "Maaf, Pesanan kamu gagal dibuat karna keranjang masih kosong",
            {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            }
          );
        } else {
          this.$toast.error("Nama dan Nomor Meja Harus diisi", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        }
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/keranjangs")
      .then((response) => this.setCart(response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    totalHarga() {
      return this.carts.reduce(function (items, data) {
        return items + data.product.harga * data.qty_order;
      }, 0);
    },
  },
};
</script>

<style>
</style>